from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.database import get_db
from app.services.classificacao import calcular_classificacao

router = APIRouter()

GRUPOS = list("ABCDEFGHIJKL")


def build_grupo(letra: str, conn):
    selecoes = conn.execute(
        "SELECT * FROM selecoes WHERE grupo = ? ORDER BY ranking_fifa ASC NULLS LAST", (letra,)
    ).fetchall()

    jogos = conn.execute(
        "SELECT * FROM jogos WHERE grupo = ? AND fase = 'grupo'", (letra,)
    ).fetchall()

    classificacao = calcular_classificacao([dict(j) for j in jogos], [dict(s) for s in selecoes])

    jogos_list = []
    for j in jogos:
        sa = conn.execute("SELECT id, nome_pt, codigo_iso, bandeira_emoji FROM selecoes WHERE id = ?", (j["selecao_a_id"],)).fetchone()
        sb = conn.execute("SELECT id, nome_pt, codigo_iso, bandeira_emoji FROM selecoes WHERE id = ?", (j["selecao_b_id"],)).fetchone()
        jogos_list.append({
            "id": j["id"], "rodada": j["rodada"], "data_hora_utc": j["data_hora_utc"],
            "estadio": j["estadio"], "cidade": j["cidade"], "status": j["status"],
            "gols_a": j["gols_a"], "gols_b": j["gols_b"],
            "selecao_a": dict(sa) if sa else None,
            "selecao_b": dict(sb) if sb else None,
        })

    return {"grupo": letra, "classificacao": classificacao, "jogos": jogos_list}


@router.get("/grupos")
def listar_grupos():
    with get_db() as conn:
        return [build_grupo(g, conn) for g in GRUPOS]


@router.get("/pontos-corridos")
def pontos_corridos():
    """Classificação-geral hipotética (pontos corridos): soma TODOS os jogos
    já encerrados de todas as fases (grupos + mata-mata). Jogos decididos nos
    pênaltis contam como empate (o placar do tempo normal/prorrogação fica igual).
    Novas fases entram automaticamente conforme os jogos são encerrados."""
    with get_db() as conn:
        selecoes = conn.execute("SELECT * FROM selecoes").fetchall()
        jogos = conn.execute("SELECT * FROM jogos WHERE status = 'encerrado'").fetchall()
        classificacao = calcular_classificacao(
            [dict(j) for j in jogos], [dict(s) for s in selecoes]
        )
        return {"classificacao": classificacao, "total_jogos": len(jogos)}


@router.get("/grupos/{letra}")
def detalhe_grupo(letra: str):
    letra = letra.upper()
    if letra not in GRUPOS:
        return JSONResponse(status_code=404, content={"error": "Grupo inválido"})
    with get_db() as conn:
        return build_grupo(letra, conn)
