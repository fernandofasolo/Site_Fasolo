"""
Smoke tests - valida que todos os endpoints principais respondem corretamente.
Requer o servidor rodando em http://localhost:8000

Uso:
    python backend/tests/test_smoke.py
    python backend/tests/test_smoke.py --base-url http://meuservidor.com
"""
import sys
import json
import argparse
import urllib.request
import urllib.error
from typing import Any

BASE_URL = "http://localhost:8000"
OK   = "[OK]"
FAIL = "[FAIL]"

passed = failed = 0


def get(path: str) -> tuple[int, Any]:
    url = f"{BASE_URL}{path}"
    try:
        with urllib.request.urlopen(url, timeout=5) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, {}
    except Exception as e:
        return 0, {"_error": str(e)}


def check(name: str, status: int, body: Any, expect_status: int = 200, assert_fn=None):
    global passed, failed
    ok = status == expect_status
    if ok and assert_fn:
        try:
            assert_fn(body)
        except (AssertionError, Exception):
            ok = False
    symbol = OK if ok else FAIL
    print(f"  {symbol}  {name}")
    if not ok:
        print(f"        status={status} body={str(body)[:120]}")
        failed += 1
    else:
        passed += 1


def run():
    print(f"\nCopa 2026 - Smoke Tests ({BASE_URL})\n{'-'*50}")

    # Health
    print("\n[ Health ]")
    s, b = get("/api/health")
    check("GET /api/health", s, b, assert_fn=lambda b: b.get("status") == "ok")

    # Jogos
    print("\n[ Jogos ]")
    s, b = get("/api/jogos")
    check("GET /api/jogos", s, b, assert_fn=lambda b: isinstance(b, list) and len(b) > 0)

    s, b = get("/api/jogos?fase=grupo&per_page=10")
    check("GET /api/jogos?fase=grupo", s, b, assert_fn=lambda b: all(j["fase"] == "grupo" for j in b))

    s, b = get("/api/jogos?status=agendado&limit=5")
    check("GET /api/jogos?status=agendado", s, b, assert_fn=lambda b: isinstance(b, list))

    s, b = get("/api/jogos/1")
    check("GET /api/jogos/1", s, b, assert_fn=lambda b: b.get("id") == 1)

    s, b = get("/api/jogos/99999")
    check("GET /api/jogos/99999 -> 404", s, b, expect_status=404)

    # Selecoes
    print("\n[ Selecoes ]")
    s, b = get("/api/selecoes")
    check("GET /api/selecoes", s, b, assert_fn=lambda b: len(b) == 48)

    s, b = get("/api/selecoes?grupo=A")
    check("GET /api/selecoes?grupo=A", s, b, assert_fn=lambda b: len(b) == 4)

    s, b = get("/api/selecoes/1")
    check("GET /api/selecoes/1", s, b, assert_fn=lambda b: "nome_pt" in b)

    s, b = get("/api/selecoes/1/jogadores")
    check("GET /api/selecoes/1/jogadores", s, b, assert_fn=lambda b: isinstance(b, list))

    s, b = get("/api/selecoes/1/jogos")
    check("GET /api/selecoes/1/jogos", s, b, assert_fn=lambda b: isinstance(b, list))

    s, b = get("/api/selecoes/99999")
    check("GET /api/selecoes/99999 -> 404", s, b, expect_status=404)

    # Jogadores Brasil (selecao_id=25)
    print("\n[ Jogadores - Brasil ]")
    s, b = get("/api/selecoes/25/jogadores")
    check("GET /api/selecoes/25/jogadores (>=23)", s, b,
          assert_fn=lambda b: len(b) >= 23 and all("posicao" in j for j in b))
    check("Brasil tem 3 goleiros", s, b,
          assert_fn=lambda b: len([j for j in b if j["posicao"] == "GK"]) == 3)

    # Grupos
    print("\n[ Grupos ]")
    s, b = get("/api/grupos")
    check("GET /api/grupos", s, b, assert_fn=lambda b: isinstance(b, dict) and "A" in b)

    s, b = get("/api/grupos/A")
    check("GET /api/grupos/A", s, b,
          assert_fn=lambda b: "classificacao" in b and len(b["classificacao"]) == 4)

    s, b = get("/api/grupos/Z")
    check("GET /api/grupos/Z -> 404", s, b, expect_status=404)

    # Escalacoes
    print("\n[ Escalacoes ]")
    s, b = get("/api/escalacoes")
    check("GET /api/escalacoes (sem session) -> []", s, b, assert_fn=lambda b: b == [])

    # Boloes
    print("\n[ Boloes ]")
    s, b = get("/api/boloes")
    check("GET /api/boloes (sem session) -> []", s, b, assert_fn=lambda b: b == [])

    # Admin - chave errada deve retornar 401
    print("\n[ Admin ]")
    try:
        req = urllib.request.Request(
            f"{BASE_URL}/api/admin/jogos/1",
            method="PATCH",
            headers={"Content-Type": "application/json", "X-Admin-Key": "chave_errada"},
            data=json.dumps({"status": "agendado"}).encode(),
        )
        with urllib.request.urlopen(req, timeout=5) as r:
            s2 = r.status
    except urllib.error.HTTPError as e:
        s2 = e.code
    check("PATCH /api/admin (chave errada) -> 401", s2, {}, expect_status=401)

    # Resultado
    total = passed + failed
    print(f"\n{'-'*50}")
    print(f"  Resultado: {passed}/{total} passaram", end="")
    if failed:
        print(f"  ({failed} falha{'s' if failed > 1 else ''})\n")
        sys.exit(1)
    else:
        print("  - todos OK\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default="http://localhost:8000")
    args = parser.parse_args()
    BASE_URL = args.base_url.rstrip("/")
    run()
