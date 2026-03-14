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
          {lines.map((line, index) => (
            <p key={`${line}-${index}`} className="pipeline-toast-line">{line}</p>
          ))}
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
