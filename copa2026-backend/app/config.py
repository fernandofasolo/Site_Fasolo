from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Suporta DB_PATH absoluto (ex: /var/data/copa2026.db no Render)
# ou relativo ao backend/ (ex: db/copa2026.db em dev)
_db_env = os.getenv("DB_PATH", "db/copa2026.db")
DB_PATH = Path(_db_env) if Path(_db_env).is_absolute() else BASE_DIR / _db_env

PORT         = int(os.getenv("PORT", 8000))
ADMIN_KEY    = os.getenv("ADMIN_KEY", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "")
