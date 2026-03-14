import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from './store';
import { validatePipeline } from './utils/validatePipeline';
import { PipelineToast } from './components/PipelineToast';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(useShallow(selector));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const validation = useMemo(() => validatePipeline(nodes, edges), [edges, nodes]);
  const dismissToast = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast(null);
  };

  const showToast = (payload, duration = 5500) => {
    dismissToast();
    setToast(payload);
    if (duration > 0) {
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
        toastTimeoutRef.current = null;
      }, duration);
    }
  };

  useEffect(() => () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
  }, []);

  const submitPipeline = async () => {
    if (!validation.isValid) {
      showToast(
        {
          title: 'Pipeline needs attention',
          status: 'danger',
          lines: validation.errors,
          warnings: validation.warnings,
        },
        8000,
      );
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
      const isDag = Boolean(data.is_dag);
      showToast(
        {
          title: isDag ? 'Pipeline analysis passed' : 'Cycle detected in pipeline',
          status: isDag ? 'success' : 'warning',
          lines: [
            `Nodes: ${data.num_nodes}`,
            `Edges: ${data.num_edges}`,
            `Is DAG: ${isDag ? 'True' : 'False'}`,
          ],
          warnings: validation.warnings,
        },
        6500,
      );
    } catch (error) {
      showToast(
        {
          title: 'Unable to analyze pipeline',
          status: 'danger',
          lines: [error.message],
        },
        8000,
      );
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
          <p className="submit-note">
            VectorShift helps teams build and ship AI workflows with a visual pipeline builder, making validation and iteration fast.
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
      <PipelineToast toast={toast} onClose={dismissToast} />
    </>
  );
};
