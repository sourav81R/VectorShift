export const PipelineResultModal = ({
  isOpen,
  title,
  status = 'info',
  lines = [],
  warnings = [],
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <section className={`result-modal result-modal-${status}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="result-modal-header">
          <div>
            <div className="panel-eyebrow">Pipeline Status</div>
            <h2 className="result-modal-title">{title}</h2>
          </div>
          <button type="button" className="result-modal-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="result-modal-body">
          {lines.map((line) => (
            <p key={line} className="result-modal-line">{line}</p>
          ))}
          {warnings.length > 0 ? (
            <div className="result-modal-warnings">
              <div className="result-modal-warning-title">Warnings</div>
              {warnings.map((warning) => (
                <p key={warning} className="result-modal-warning-line">{warning}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

