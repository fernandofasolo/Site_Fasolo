#!/usr/bin/env python3
"""
Inicializa o banco de dados: cria tabelas e popula seeds.
Uso:
  python db/init.py           # cria banco se não existir, aplica migrations e seeds
  python db/init.py --reset   # apaga e recria tudo
  python db/init.py --seed-only  # aplica seeds sem recriar tabelas
"""
import sqlite3
import sys
import os
from pathlib import Path

BASE = Path(__file__).parent
DB_PATH = BASE / "copa2026.db"
MIGRATIONS_DIR = BASE / "migrations"
SEEDS_DIR = BASE / "seeds"


def get_conn():
    conn = sqlite3.connect(str(DB_PATH))
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def run_migrations(conn):
    for sql_file in sorted(MIGRATIONS_DIR.glob("*.sql")):
        print(f"  Migration: {sql_file.name}")
        conn.executescript(sql_file.read_text(encoding="utf-8"))
    conn.commit()


def run_seeds(conn):
    for sql_file in sorted(SEEDS_DIR.glob("*.sql")):
        print(f"  Seed: {sql_file.name}")
        conn.executescript(sql_file.read_text(encoding="utf-8"))
    conn.commit()


def is_populated(conn) -> bool:
    try:
        count = conn.execute("SELECT COUNT(*) FROM selecoes").fetchone()[0]
        return count > 0
    except Exception:
        return False


def main():
    args = sys.argv[1:]
    reset = "--reset" in args
    seed_only = "--seed-only" in args

    if reset and DB_PATH.exists():
        DB_PATH.unlink()
        print(f"Banco removido: {DB_PATH}")

    print(f"Banco: {DB_PATH}")
    conn = get_conn()

    if not seed_only:
        print("Aplicando migrations...")
        run_migrations(conn)

    if is_populated(conn) and not reset and not seed_only:
        print("Banco já possui dados. Use --reset para recriar. Saindo.")
        conn.close()
        return

    if seed_only or reset or not is_populated(conn):
        print("Populando seeds...")
        run_seeds(conn)

    total_selecoes = conn.execute("SELECT COUNT(*) FROM selecoes").fetchone()[0]
    total_jogos = conn.execute("SELECT COUNT(*) FROM jogos").fetchone()[0]
    total_jogadores = conn.execute("SELECT COUNT(*) FROM jogadores").fetchone()[0]
    print(f"\nPronto!")
    print(f"  Seleções:  {total_selecoes}")
    print(f"  Jogos:     {total_jogos}")
    print(f"  Jogadores: {total_jogadores}")
    conn.close()


if __name__ == "__main__":
    main()
