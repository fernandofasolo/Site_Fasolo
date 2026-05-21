from typing import Dict, List, Any


# Tabela oficial FIFA 2026 para oitavas de final
# Formato: (1º do grupo X, 2º do grupo Y) ou (melhor 3º de grupo Z)
BRACKET_OITAVAS = [
    ("1A", "2B"),
    ("1C", "2D"),
    ("1E", "2F"),
    ("1G", "2H"),
    ("1I", "2J"),
    ("1K", "2L"),
    ("melhor3-ABG", "melhor3-CDH"),
    ("melhor3-EFI", "melhor3-JKL"),
]


def montar_chaveamento(classificacao_grupos: Dict[str, List]) -> Dict:
    oitavas = []
    for conf in BRACKET_OITAVAS:
        oitavas.append({
            "selecao_a": _resolver_vaga(conf[0], classificacao_grupos),
            "selecao_b": _resolver_vaga(conf[1], classificacao_grupos),
            "gols_a": None,
            "gols_b": None,
        })
    return {"oitavas": oitavas}


def _resolver_vaga(vaga: str, grupos: Dict[str, List]):
    if vaga.startswith("1") or vaga.startswith("2"):
        pos = int(vaga[0]) - 1
        letra = vaga[1]
        grupo = grupos.get(letra, [])
        return grupo[pos] if len(grupo) > pos else None
    return None
