from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from .graph_utils import is_dag
    from .models import PipelineParseRequest, PipelineParseResponse
except ImportError:
    from graph_utils import is_dag
    from models import PipelineParseRequest, PipelineParseResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=PipelineParseResponse)
def parse_pipeline(payload: PipelineParseRequest) -> PipelineParseResponse:
    node_ids = [node.id for node in payload.nodes]

    return PipelineParseResponse(
        num_nodes=len(payload.nodes),
        num_edges=len(payload.edges),
        is_dag=is_dag(node_ids, payload.edges),
    )
