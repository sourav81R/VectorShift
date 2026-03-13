import { Sidebar } from './Sidebar';

export function MobileNodeLibrary({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`mobile-library-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
        role="button"
        tabIndex={-1}
      />
      <aside
        className={`mobile-library-sheet ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-library-title"
      >
        <div className="mobile-library-sheet-handle" />
        <div className="mobile-library-sheet-header">
          <div>
            <div className="panel-eyebrow">Node Library</div>
            <h2 className="sidebar-title" id="mobile-library-title">Add Nodes</h2>
          </div>
          <button type="button" className="mobile-library-close" onClick={onClose} aria-label="Close node library">
            &times;
          </button>
        </div>
        <Sidebar onNodeAdded={onClose} />
      </aside>
    </>
  );
}