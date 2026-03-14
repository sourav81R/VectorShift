export const PipelineToast = ({ toast, onClose }) => {
  if (!toast) {
    return null;
  }

  const {
    title,
    status = 'info',
    lines = [],
    warnings = [],
  } = toast;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      <section className={`pipeline-toast pipeline-toast-${status}`} aria-label={title}>
        <div className="pipeline-toast-header">
          <div>
            <div className="panel-eyebrow">Pipeline Status</div>
            <h4 className="pipeline-toast-title">{title}</h4>
          </div>
          <button
            type="button"
            className="pipeline-toast-close"
            onClick={onClose}
            aria-label="Close notification"
          >
            Close
          </button>
        </div>
        <div className="pipeline-toast-body">
          {lines.map((line, index) => {
            const colonIndex = line.indexOf(':');
            const hasLabel = colonIndex > -1;
            const label = hasLabel ? line.slice(0, colonIndex + 1) : '';
            const value = hasLabel ? line.slice(colonIndex + 1).trim() : line;

            return (
              <p key={`${line}-${index}`} className="pipeline-toast-line">
                {hasLabel ? (
                  <>
                    <span className="pipeline-toast-label">{label}</span>
                    <span className="pipeline-toast-value">{value}</span>
                  </>
                ) : (
                  line
                )}
              </p>
            );
          })}
          {warnings.length > 0 ? (
            <div className="pipeline-toast-warnings">
              <div className="pipeline-toast-warning-title">Warnings</div>
              {warnings.map((warning, index) => (
                <p key={`${warning}-${index}`} className="pipeline-toast-warning-line">{warning}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};
