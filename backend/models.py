from pydantic import BaseModel, ConfigDict


class PipelineNode(BaseModel):
    id: str
    model_config = ConfigDict(extra="allow")


class PipelineEdge(BaseModel):
    source: str
    target: str
    model_config = ConfigDict(extra="allow")


class PipelineParseRequest(BaseModel):
    nodes: list[PipelineNode]
    edges: list[PipelineEdge]


class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

