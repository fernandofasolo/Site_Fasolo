from fastapi import APIRouter, Header
from fastapi.responses import JSONResponse
from app.database import get_db
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class EscalacaoPayload(BaseModel):
    nome: str = "Minha Escalação"
    formacao: str = "4-3-3"
    titulares_json: str
    reservas_json: Optional[str] = None


@router.get("/escalacoes")
def listar_escalacoes(x_session_id: Optional[str] = Header(None)):
    if not x_session_id:
        return []
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM escalacoes WHERE session_id = ? ORDER BY criado_em DESC",
            (x_session_id,),
        ).fetchall()
        return [dict(r) for r in rows]


@router.post("/escalacoes", status_code=201)
def criar_escalacao(payload: EscalacaoPayload, x_session_id: Optional[str] = Header(None)):
    with get_db() as conn:
        cur = conn.execute(
            "INSERT INTO escalacoes (nome, formacao, titulares_json, reservas_json, session_id) VALUES (?,?,?,?,?)",
            (payload.nome, payload.formacao, payload.titulares_json, payload.reservas_json, x_session_id),
        )
        return {"id": cur.lastrowid, **payload.dict()}


@router.put("/escalacoes/{esc_id}")
def atualizar_escalacao(esc_id: int, payload: EscalacaoPayload, x_session_id: Optional[str] = Header(None)):
    with get_db() as conn:
        row = conn.execute("SELECT id FROM escalacoes WHERE id = ? AND session_id = ?", (esc_id, x_session_id)).fetchone()
        if not row:
            return JSONResponse(status_code=404, content={"error": "Escalação não encontrada"})
        conn.execute(
            "UPDATE escalacoes SET nome=?, formacao=?, titulares_json=?, reservas_json=? WHERE id=?",
            (payload.nome, payload.formacao, payload.titulares_json, payload.reservas_json, esc_id),
        )
        return {"id": esc_id, **payload.dict()}


@router.delete("/escalacoes/{esc_id}", status_code=204)
def deletar_escalacao(esc_id: int, x_session_id: Optional[str] = Header(None)):
    with get_db() as conn:
        conn.execute("DELETE FROM escalacoes WHERE id = ? AND session_id = ?", (esc_id, x_session_id))
