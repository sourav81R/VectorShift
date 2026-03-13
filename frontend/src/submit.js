import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from './store';

const buttonStyle = {
    padding: '10px 18px',
    borderRadius: '999px',
    border: 'none',
    background: '#2563eb',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer'
};

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(useShallow(selector));
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitPipeline = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nodes, edges })
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();

            alert(`Pipeline Analysis

Nodes: ${data.num_nodes}
Edges: ${data.num_edges}
Is DAG: ${data.is_dag ? 'Yes' : 'No'}`);
        } catch (error) {
            alert(`Unable to analyze pipeline: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                    ...buttonStyle,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'wait' : 'pointer'
                }}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </section>
    );
}
