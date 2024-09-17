import React from 'react';

function Loader() {
  // Define inline styles
  const loaderContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full viewport height
  };

  const spinnerStyle = {
    border: '8px solid rgba(0, 0, 0, 0.1)',
    borderLeft: '8px solid #3498db',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
  };

  const loaderTextStyle = {
    marginTop: '10px',
    fontSize: '1.2rem',
    color: '#3498db',
  };

  // Keyframes for animation need to be injected into the document head
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);

    // Cleanup style element on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={loaderContainerStyle}>
      <div style={spinnerStyle}></div>
      <p style={loaderTextStyle}>Loading...</p>
    </div>
  );
}

export default Loader;
