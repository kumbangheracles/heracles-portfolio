"use client";
import "./loading-typ1.css";

interface PropTypes {
  loadingTitle: string;
}

const LoadingType1 = ({ loadingTitle = "Loading . . ." }: PropTypes) => {
  return (
    <>
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">Status</div>
          <div className="terminal-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
        </div>
        <div className="text">{loadingTitle}</div>
      </div>
    </>
  );
};

export default LoadingType1;
