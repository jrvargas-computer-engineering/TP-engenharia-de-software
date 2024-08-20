from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from guide import guide_router
from topic import topic_router
from section import section_router
from review import review_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://6qd4q9qt-4000.brs.devtunnels.ms"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(guide_router, prefix="/guide")
app.include_router(topic_router, prefix="/topic")
app.include_router(section_router, prefix="/section")
app.include_router(review_router, prefix="/review")

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}