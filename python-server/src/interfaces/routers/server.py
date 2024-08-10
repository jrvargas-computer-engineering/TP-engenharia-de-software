from fastapi import FastAPI
from guide import guide_router
from topic import topic_router

app = FastAPI()

app.include_router(guide_router, prefix="/guide")
app.include_router(topic_router, prefix="/topic")

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}