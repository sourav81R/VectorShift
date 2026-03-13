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
        <section
            style={{
                padding: 20,
                borderRadius: 24,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
                display: 'grid',
                gap: 14
            }}
        >
            <div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6366f1' }}>
                    Validation
                </div>
                <h3 style={{ margin: '6px 0 0', fontSize: 20, color: '#0f172a' }}>Analyze current pipeline</h3>
                <p style={{ margin: '8px 0 0', color: '#64748b', lineHeight: 1.5 }}>
                    Send the current nodes and edges to the FastAPI backend to validate the graph and detect cycles.
                </p>
            </div>
            <button
                type="button"
                onClick={submitPipeline}
                disabled={isSubmitting}
                style={{
                    ...buttonStyle,
                    width: '100%',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'wait' : 'pointer'
                }}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </section>
    );
}
