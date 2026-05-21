from typing import List, Dict, Any


def calcular_classificacao(jogos: List[Dict], selecoes: List[Dict]) -> List[Dict]:
    stats = {s["id"]: {
        "selecao_id": s["id"],
        "nome_pt": s["nome_pt"],
        "codigo_iso": s["codigo_iso"],
        "bandeira_emoji": s["bandeira_emoji"],
        "ranking_fifa": s.get("ranking_fifa"),
        "eh_cabeca_chave": s.get("eh_cabeca_chave", 0),
        "pote": s.get("pote"),
        "jogos": 0, "vitorias": 0, "empates": 0, "derrotas": 0,
        "gols_pro": 0, "gols_contra": 0, "saldo_gols": 0, "pontos": 0,
    } for s in selecoes}

    for j in jogos:
        if j.get("gols_a") is None or j.get("gols_b") is None:
            continue
        id_a, id_b = j["selecao_a_id"], j["selecao_b_id"]
        ga, gb = j["gols_a"], j["gols_b"]

        for sid in (id_a, id_b):
            if sid not in stats:
                continue
            stats[sid]["jogos"] += 1

        if id_a in stats:
            stats[id_a]["gols_pro"] += ga
            stats[id_a]["gols_contra"] += gb
            stats[id_a]["saldo_gols"] += ga - gb
        if id_b in stats:
            stats[id_b]["gols_pro"] += gb
            stats[id_b]["gols_contra"] += ga
            stats[id_b]["saldo_gols"] += gb - ga

        if ga > gb:
            if id_a in stats: stats[id_a]["vitorias"] += 1; stats[id_a]["pontos"] += 3
            if id_b in stats: stats[id_b]["derrotas"] += 1
        elif gb > ga:
            if id_b in stats: stats[id_b]["vitorias"] += 1; stats[id_b]["pontos"] += 3
            if id_a in stats: stats[id_a]["derrotas"] += 1
        else:
            if id_a in stats: stats[id_a]["empates"] += 1; stats[id_a]["pontos"] += 1
            if id_b in stats: stats[id_b]["empates"] += 1; stats[id_b]["pontos"] += 1

    lista = list(stats.values())
    lista.sort(key=lambda s: (
        -s["pontos"],
        -s["saldo_gols"],
        -s["gols_pro"],
        s["ranking_fifa"] if s["ranking_fifa"] else 999,
    ))

    for i, s in enumerate(lista):
        s["posicao"] = i + 1

    return lista


def selecionar_melhores_terceiros(terceiros: List[Dict]) -> List[Dict]:
    terceiros.sort(key=lambda s: (
        -s["pontos"],
        -s["saldo_gols"],
        -s["gols_pro"],
        s["ranking_fifa"] if s["ranking_fifa"] else 999,
    ))
    return terceiros[:8]
