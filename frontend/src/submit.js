import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { PipelineResultModal } from './components/PipelineResultModal';
import { useStore } from './store';
import { validatePipeline } from './utils/validatePipeline';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(useShallow(selector));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    status: 'info',
    lines: [],
    warnings: [],
  });

  const validation = useMemo(() => validatePipeline(nodes, edges), [edges, nodes]);

  const openModal = (nextState) => {
    setModalState({
      isOpen: true,
      title: nextState.title,
      status: nextState.status,
      lines: nextState.lines,
      warnings: nextState.warnings ?? [],
    });
  };

  const submitPipeline = async () => {
    if (!validation.isValid) {
      openModal({
        title: 'Pipeline needs attention',
        status: 'warning',
        lines: validation.errors,
        warnings: validation.warnings,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      openModal({
        title: data.is_dag ? 'Pipeline analysis passed' : 'Cycle detected in pipeline',
        status: data.is_dag ? 'success' : 'warning',
        lines: [
          `Nodes: ${data.num_nodes}`,
          `Edges: ${data.num_edges}`,
          `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`,
        ],
        warnings: validation.warnings,
      });
    } catch (error) {
      openModal({
        title: 'Unable to analyze pipeline',
        status: 'danger',
        lines: [error.message],
        warnings: [],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="submit-card">
        <div>
          <div className="panel-eyebrow">Validation</div>
          <h3 className="submit-title">Analyze current pipeline</h3>
          <p className="submit-copy">
            Send the current nodes and edges to the FastAPI backend to validate the graph and detect cycles.
          </p>
        </div>
        <button
          type="button"
          onClick={submitPipeline}
          disabled={isSubmitting}
          className="submit-button"
          style={{
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'wait' : 'pointer',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </section>
      <PipelineResultModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        status={modalState.status}
        lines={modalState.lines}
        warnings={modalState.warnings}
        onClose={() => setModalState((current) => ({ ...current, isOpen: false }))}
      />
    </>
  );
};
