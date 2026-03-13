// submit.js

export const SubmitButton = () => {

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button
                type="button"
                style={{
                    padding: '10px 18px',
                    borderRadius: '999px',
                    border: 'none',
                    background: '#2563eb',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
            >
                Submit
            </button>
        </div>
    );
}
