from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.init_db import init_db
from app.api.routes.health import router as health_router
from app.api.routes.auth import router as auth_router
from app.api.routes.users import router as users_router
from app.api.routes.ai_chat import router as ai_chat_router
from app.api.routes.news import router as news_router
from app.api.routes.admin_news import router as admin_news_router

app = FastAPI(title=settings.APP_NAME)


@app.on_event('startup')
def on_startup():
    init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(health_router)
app.include_router(auth_router, prefix='/auth')
app.include_router(users_router, prefix='/users')
app.include_router(ai_chat_router)
app.include_router(news_router)
app.include_router(admin_news_router)
