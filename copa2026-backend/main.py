from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.exceptions import HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging
import time

from app.routes import jogos, grupos, selecoes, escalacoes, boloes, admin
from app.config import FRONTEND_URL

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="Copa do Mundo 2026 API", version="1.0.0")

_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
if FRONTEND_URL:
    _origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = (time.time() - start) * 1000
    logger.info(f"{request.method} {request.url.path} {response.status_code} {duration:.1f}ms")
    return response


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        return JSONResponse(status_code=404, content={"error": "Recurso não encontrado"})
    return JSONResponse(status_code=exc.status_code, content={"error": exc.detail})


@app.exception_handler(500)
async def server_error(request: Request, exc):
    return JSONResponse(status_code=500, content={"error": "Erro interno do servidor"})


@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")


@app.get("/api/health")
def health():
    return {"status": "ok", "versao": "1.0.0"}


app.include_router(jogos.router, prefix="/api")
app.include_router(grupos.router, prefix="/api")
app.include_router(selecoes.router, prefix="/api")
app.include_router(escalacoes.router, prefix="/api")
app.include_router(boloes.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
