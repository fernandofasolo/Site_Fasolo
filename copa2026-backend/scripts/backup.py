"""
Backup do banco SQLite com rotação automática (mantém últimos N arquivos).

Uso:
    python backend/scripts/backup.py
    python backend/scripts/backup.py --keep 10
    python backend/scripts/backup.py --dest C:/backups/copa

Pode ser agendado via Windows Task Scheduler ou cron no Linux:
    # Linux/Mac — cron todo dia às 03:00
    0 3 * * * cd /opt/copa2026 && python backend/scripts/backup.py
"""
import shutil
import argparse
from pathlib import Path
from datetime import datetime

DEFAULT_DB   = Path(__file__).parent.parent / "db" / "copa2026.db"
DEFAULT_DEST = Path(__file__).parent.parent / "db" / "backups"
DEFAULT_KEEP = 7


def backup(db_path: Path, dest_dir: Path, keep: int):
    if not db_path.exists():
        print(f"[ERRO] Banco não encontrado: {db_path}")
        raise SystemExit(1)

    dest_dir.mkdir(parents=True, exist_ok=True)

    ts   = datetime.now().strftime("%Y%m%d_%H%M%S")
    dest = dest_dir / f"copa2026_{ts}.db"

    shutil.copy2(db_path, dest)
    size_kb = dest.stat().st_size // 1024
    print(f"[OK] Backup criado: {dest}  ({size_kb} KB)")

    # Rotação — remove os mais antigos
    backups = sorted(dest_dir.glob("copa2026_*.db"), key=lambda p: p.stat().st_mtime)
    removidos = backups[:-keep] if len(backups) > keep else []
    for old in removidos:
        old.unlink()
        print(f"[OK] Removido backup antigo: {old.name}")

    print(f"     {len(backups) - len(removidos)}/{keep} backups mantidos em {dest_dir}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Backup do SQLite da Copa 2026")
    parser.add_argument("--db",   default=str(DEFAULT_DB),   help="Caminho do arquivo .db")
    parser.add_argument("--dest", default=str(DEFAULT_DEST), help="Diretório de destino")
    parser.add_argument("--keep", default=DEFAULT_KEEP, type=int, help="Quantidade de backups a manter")
    args = parser.parse_args()

    backup(Path(args.db), Path(args.dest), args.keep)
