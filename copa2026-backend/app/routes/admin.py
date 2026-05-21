from fastapi import APIRouter, Header
from fastapi.responses import JSONResponse
from app.database import get_db
from app.config import ADMIN_KEY, DB_PATH
from pydantic import BaseModel
from typing import Optional
from pathlib import Path
import sqlite3

router = APIRouter()


def verificar_admin(key: Optional[str]) -> bool:
    return bool(ADMIN_KEY) and key == ADMIN_KEY


class PlacarPayload(BaseModel):
    gols_a: Optional[int] = None
    gols_b: Optional[int] = None
    penaltis_a: Optional[int] = None
    penaltis_b: Optional[int] = None
    status: Optional[str] = None


@router.get("/admin/validate")
def validar_admin(x_admin_key: Optional[str] = Header(None)):
    if not verificar_admin(x_admin_key):
        return JSONResponse(status_code=401, content={"error": "Não autorizado"})
    return {"ok": True}


@router.post("/admin/reseed")
def reseed_database(x_admin_key: Optional[str] = Header(None)):
    if not verificar_admin(x_admin_key):
        return JSONResponse(status_code=401, content={"error": "Não autorizado"})

    seeds_dir = Path(__file__).resolve().parent.parent.parent / "db" / "seeds"
    conn = sqlite3.connect(str(DB_PATH))
    conn.execute("PRAGMA foreign_keys = OFF")

    for tabela in ("palpites", "boloes", "escalacoes", "jogos", "jogadores", "selecoes"):
        conn.execute(f"DELETE FROM {tabela}")
    for tabela in ("selecoes", "jogos", "jogadores", "boloes", "palpites", "escalacoes"):
        conn.execute("DELETE FROM sqlite_sequence WHERE name = ?", (tabela,))
    conn.commit()

    for seed_file in sorted(seeds_dir.glob("*.sql")):
        conn.executescript(seed_file.read_text(encoding="utf-8"))
        conn.commit()

    conn.execute("PRAGMA foreign_keys = ON")
    conn.commit()

    total_selecoes  = conn.execute("SELECT COUNT(*) FROM selecoes").fetchone()[0]
    total_jogos     = conn.execute("SELECT COUNT(*) FROM jogos").fetchone()[0]
    total_jogadores = conn.execute("SELECT COUNT(*) FROM jogadores").fetchone()[0]
    conn.close()

    return {
        "ok": True,
        "selecoes": total_selecoes,
        "jogos": total_jogos,
        "jogadores": total_jogadores,
    }


@router.patch("/admin/jogos/{jogo_id}")
def atualizar_placar(
    jogo_id: int,
    payload: PlacarPayload,
    x_admin_key: Optional[str] = Header(None),
):
    if not verificar_admin(x_admin_key):
        return JSONResponse(status_code=401, content={"error": "Não autorizado"})

    with get_db() as conn:
        jogo = conn.execute("SELECT id FROM jogos WHERE id = ?", (jogo_id,)).fetchone()
        if not jogo:
            return JSONResponse(status_code=404, content={"error": "Jogo não encontrado"})

        fields = payload.model_dump(exclude_unset=True)
        updates, params = [], []
        for col in ("gols_a", "gols_b", "penaltis_a", "penaltis_b"):
            if col in fields:
                updates.append(f"{col} = ?")
                params.append(fields[col])
        if "status" in fields and fields["status"] in ("agendado", "em_andamento", "encerrado"):
            updates.append("status = ?")
            params.append(fields["status"])

        if not updates:
            return JSONResponse(status_code=400, content={"error": "Nenhum campo para atualizar"})

        params.append(jogo_id)
        conn.execute(f"UPDATE jogos SET {', '.join(updates)} WHERE id = ?", params)
        return {"ok": True}
