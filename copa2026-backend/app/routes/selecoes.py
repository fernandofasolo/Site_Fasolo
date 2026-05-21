from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from app.database import get_db
from typing import Optional

router = APIRouter()


@router.get("/selecoes")
def listar_selecoes(grupo: Optional[str] = None, confederacao: Optional[str] = None):
    with get_db() as conn:
        where, params = [], []
        if grupo:
            where.append("grupo = ?")
            params.append(grupo.upper())
        if confederacao:
            where.append("confederacao = ?")
            params.append(confederacao.upper())
        sql = "SELECT * FROM selecoes"
        if where:
            sql += " WHERE " + " AND ".join(where)
        sql += " ORDER BY grupo, pote"
        rows = conn.execute(sql, params).fetchall()
        return [dict(r) for r in rows]


@router.get("/selecoes/{selecao_id}")
def detalhe_selecao(selecao_id: int):
    with get_db() as conn:
        row = conn.execute("SELECT * FROM selecoes WHERE id = ?", (selecao_id,)).fetchone()
        if not row:
            return JSONResponse(status_code=404, content={"error": "Seleção não encontrada"})
        return dict(row)


@router.get("/selecoes/{selecao_id}/jogadores")
def elenco(selecao_id: int, posicao: Optional[str] = None):
    with get_db() as conn:
        sel = conn.execute("SELECT id FROM selecoes WHERE id = ?", (selecao_id,)).fetchone()
        if not sel:
            return JSONResponse(status_code=404, content={"error": "Seleção não encontrada"})
        where = "selecao_id = ?"
        params = [selecao_id]
        if posicao:
            where += " AND posicao = ?"
            params.append(posicao.upper())
        rows = conn.execute(
            f"SELECT * FROM jogadores WHERE {where} ORDER BY posicao, numero", params
        ).fetchall()
        return [dict(r) for r in rows]


@router.get("/selecoes/{selecao_id}/jogos")
def jogos_selecao(selecao_id: int):
    with get_db() as conn:
        rows = conn.execute(
            """SELECT j.*,
               sa.id as sa_id, sa.nome_pt as sa_nome_pt, sa.bandeira_emoji as sa_bandeira_emoji,
               sb.id as sb_id, sb.nome_pt as sb_nome_pt, sb.bandeira_emoji as sb_bandeira_emoji
               FROM jogos j
               LEFT JOIN selecoes sa ON j.selecao_a_id = sa.id
               LEFT JOIN selecoes sb ON j.selecao_b_id = sb.id
               WHERE j.selecao_a_id = ? OR j.selecao_b_id = ?
               ORDER BY j.data_hora_utc""",
            (selecao_id, selecao_id),
        ).fetchall()
        result = []
        for r in rows:
            jogo = dict(r)
            jogo["selecao_a"] = {"id": r["sa_id"], "nome_pt": r["sa_nome_pt"], "bandeira_emoji": r["sa_bandeira_emoji"]}
            jogo["selecao_b"] = {"id": r["sb_id"], "nome_pt": r["sb_nome_pt"], "bandeira_emoji": r["sb_bandeira_emoji"]}
            result.append(jogo)
        return result
