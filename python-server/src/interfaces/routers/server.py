from fastapi import FastAPI
from guide import guide_router
from topic import topic_router
from section import section_router

app = FastAPI()

app.include_router(guide_router, prefix="/guide")
app.include_router(topic_router, prefix="/topic")
app.include_router(section_router, prefix="/section")

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}