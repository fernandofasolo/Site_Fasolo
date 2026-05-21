from fastapi import APIRouter, Header
from fastapi.responses import JSONResponse
from app.database import get_db
from app.services.classificacao import calcular_classificacao
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class BolaoPayload(BaseModel):
    nome: str = "Meu Bolão"


class PalpitePayload(BaseModel):
    jogo_id: int
    gols_a: int
    gols_b: int
    penaltis_a: Optional[int] = None
    penaltis_b: Optional[int] = None


@router.get("/boloes")
def listar_boloes(x_session_id: Optional[str] = Header(None)):
    if not x_session_id:
        return []
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM boloes WHERE session_id = ? ORDER BY criado_em DESC", (x_session_id,)
        ).fetchall()
        return [dict(r) for r in rows]


@router.post("/boloes", status_code=201)
def criar_bolao(payload: BolaoPayload, x_session_id: Optional[str] = Header(None)):
    session = x_session_id or "anonymous"
    with get_db() as conn:
        cur = conn.execute(
            "INSERT INTO boloes (nome, session_id) VALUES (?, ?)", (payload.nome, session)
        )
        return {"id": cur.lastrowid, "nome": payload.nome, "session_id": session}


@router.delete("/boloes/{bolao_id}", status_code=204)
def deletar_bolao(bolao_id: int, x_session_id: Optional[str] = Header(None)):
    with get_db() as conn:
        conn.execute("DELETE FROM boloes WHERE id = ? AND session_id = ?", (bolao_id, x_session_id))


@router.get("/boloes/{bolao_id}/palpites")
def listar_palpites(bolao_id: int):
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM palpites WHERE bolao_id = ?", (bolao_id,)).fetchall()
        return [dict(r) for r in rows]


@router.post("/boloes/{bolao_id}/palpites", status_code=201)
def salvar_palpite(bolao_id: int, payload: PalpitePayload):
    with get_db() as conn:
        bolao = conn.execute("SELECT id FROM boloes WHERE id = ?", (bolao_id,)).fetchone()
        if not bolao:
            return JSONResponse(status_code=404, content={"error": "Bolão não encontrado"})
        conn.execute(
            """INSERT INTO palpites (bolao_id, jogo_id, gols_a, gols_b, penaltis_a, penaltis_b)
               VALUES (?,?,?,?,?,?)
               ON CONFLICT(bolao_id, jogo_id) DO UPDATE SET
               gols_a=excluded.gols_a, gols_b=excluded.gols_b,
               penaltis_a=excluded.penaltis_a, penaltis_b=excluded.penaltis_b""",
            (bolao_id, payload.jogo_id, payload.gols_a, payload.gols_b, payload.penaltis_a, payload.penaltis_b),
        )
        return {"ok": True}


@router.get("/boloes/{bolao_id}/chaveamento")
def chaveamento(bolao_id: int):
    with get_db() as conn:
        palpites = conn.execute("SELECT * FROM palpites WHERE bolao_id = ?", (bolao_id,)).fetchall()
        jogos_grupo = conn.execute(
            "SELECT * FROM jogos WHERE fase = 'grupo' ORDER BY grupo, rodada"
        ).fetchall()
        selecoes = conn.execute("SELECT * FROM selecoes").fetchall()

        palpites_map = {p["jogo_id"]: dict(p) for p in palpites}

        jogos_simulados = []
        for j in jogos_grupo:
            p = palpites_map.get(j["id"], {})
            jogos_simulados.append({
                **dict(j),
                "gols_a": p.get("gols_a"),
                "gols_b": p.get("gols_b"),
            })

        grupos_classificacao = {}
        for letra in "ABCDEFGHIJKL":
            jogos_g = [jg for jg in jogos_simulados if jg["grupo"] == letra]
            sels_g = [s for s in selecoes if s["grupo"] == letra]
            grupos_classificacao[letra] = calcular_classificacao(jogos_g, [dict(s) for s in sels_g])

        return {"grupos": grupos_classificacao, "bolao_id": bolao_id}
