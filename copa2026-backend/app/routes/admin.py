from fastapi import APIRouter, Header
from fastapi.responses import JSONResponse
from app.database import get_db
from app.config import ADMIN_KEY
from pydantic import BaseModel
from typing import Optional

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
