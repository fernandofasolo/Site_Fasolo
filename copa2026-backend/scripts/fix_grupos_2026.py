#!/usr/bin/env python3
"""
Corrige os grupos da Copa 2026 no banco de dados de produção.
Aplica os grupos oficiais do sorteio de 05/12/2025.

Executar no shell do Render:
  python scripts/fix_grupos_2026.py
"""
import sqlite3
import os
from pathlib import Path

DB_PATH = os.environ.get('DB_PATH', str(Path(__file__).parent.parent / 'db' / 'copa2026.db'))
SEEDS_DIR = Path(__file__).parent.parent / 'db' / 'seeds'


def main():
    print(f"Banco: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = OFF")

    print("Limpando dados existentes...")
    conn.execute("DELETE FROM palpites")
    conn.execute("DELETE FROM boloes")
    conn.execute("DELETE FROM escalacoes")
    conn.execute("DELETE FROM jogos")
    conn.execute("DELETE FROM jogadores")
    conn.execute("DELETE FROM selecoes")

    # Reset auto-increment
    for tabela in ('selecoes', 'jogos', 'jogadores', 'boloes', 'palpites', 'escalacoes'):
        conn.execute("DELETE FROM sqlite_sequence WHERE name = ?", (tabela,))

    conn.commit()
    print("Dados removidos.")

    print("Populando seeds atualizados...")
    for seed_file in sorted(SEEDS_DIR.glob("*.sql")):
        print(f"  {seed_file.name}")
        conn.executescript(seed_file.read_text(encoding="utf-8"))
        conn.commit()

    conn.execute("PRAGMA foreign_keys = ON")
    conn.commit()

    total_selecoes  = conn.execute("SELECT COUNT(*) FROM selecoes").fetchone()[0]
    total_jogos     = conn.execute("SELECT COUNT(*) FROM jogos").fetchone()[0]
    total_jogadores = conn.execute("SELECT COUNT(*) FROM jogadores").fetchone()[0]
    conn.close()

    print(f"\nPronto!")
    print(f"  Seleções:  {total_selecoes}")
    print(f"  Jogos:     {total_jogos}")
    print(f"  Jogadores: {total_jogadores}")


if __name__ == "__main__":
    main()
