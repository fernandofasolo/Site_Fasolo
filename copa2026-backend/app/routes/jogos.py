from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from app.database import get_db
from typing import Optional

router = APIRouter()


def row_to_jogo(row):
    return {
        "id": row["id"],
        "fase": row["fase"],
        "grupo": row["grupo"],
        "rodada": row["rodada"],
        "data_hora_utc": row["data_hora_utc"],
        "estadio": row["estadio"],
        "cidade": row["cidade"],
        "pais_sede": row["pais_sede"],
        "status": row["status"],
        "selecao_a_id": row["selecao_a_id"],
        "selecao_b_id": row["selecao_b_id"],
        "gols_a": row["gols_a"],
        "gols_b": row["gols_b"],
        "penaltis_a": row["penaltis_a"],
        "penaltis_b": row["penaltis_b"],
        "selecao_a": {
            "id": row["sa_id"],
            "nome_pt": row["sa_nome_pt"],
            "codigo_iso": row["sa_codigo_iso"],
            "bandeira_emoji": row["sa_bandeira_emoji"],
        } if row["sa_id"] else None,
        "selecao_b": {
            "id": row["sb_id"],
            "nome_pt": row["sb_nome_pt"],
            "codigo_iso": row["sb_codigo_iso"],
            "bandeira_emoji": row["sb_bandeira_emoji"],
        } if row["sb_id"] else None,
    }


JOGO_SELECT = """
    SELECT j.*,
           sa.id as sa_id, sa.nome_pt as sa_nome_pt, sa.codigo_iso as sa_codigo_iso, sa.bandeira_emoji as sa_bandeira_emoji,
           sb.id as sb_id, sb.nome_pt as sb_nome_pt, sb.codigo_iso as sb_codigo_iso, sb.bandeira_emoji as sb_bandeira_emoji
    FROM jogos j
    LEFT JOIN selecoes sa ON j.selecao_a_id = sa.id
    LEFT JOIN selecoes sb ON j.selecao_b_id = sb.id
"""


@router.get("/jogos")
def listar_jogos(
    fase: Optional[str] = None,
    grupo: Optional[str] = None,
    status: Optional[str] = None,
    data: Optional[str] = None,
    selecao_id: Optional[int] = None,
    limit: Optional[int] = None,
    order: str = "asc",
    page: int = 1,
    per_page: int = 20,
):
    with get_db() as conn:
        where = []
        params = []

        if fase:
            where.append("j.fase = ?")
            params.append(fase)
        if grupo:
            where.append("j.grupo = ?")
            params.append(grupo.upper())
        if status:
            where.append("j.status = ?")
            params.append(status)
        if data:
            where.append("date(j.data_hora_utc) = ?")
            params.append(data)
        if selecao_id:
            where.append("(j.selecao_a_id = ? OR j.selecao_b_id = ?)")
            params.extend([selecao_id, selecao_id])

        sql = JOGO_SELECT
        if where:
            sql += " WHERE " + " AND ".join(where)
        direction = "DESC" if order.lower() == "desc" else "ASC"
        sql += f" ORDER BY j.data_hora_utc {direction}"

        if limit:
            sql += f" LIMIT {int(limit)}"
        else:
            offset = (page - 1) * per_page
            sql += f" LIMIT {per_page} OFFSET {offset}"

        rows = conn.execute(sql, params).fetchall()
        return [row_to_jogo(r) for r in rows]


@router.get("/jogos/{jogo_id}")
def detalhe_jogo(jogo_id: int):
    with get_db() as conn:
        row = conn.execute(JOGO_SELECT + " WHERE j.id = ?", (jogo_id,)).fetchone()
        if not row:
            return JSONResponse(status_code=404, content={"error": "Jogo não encontrado"})
        return row_to_jogo(row)
