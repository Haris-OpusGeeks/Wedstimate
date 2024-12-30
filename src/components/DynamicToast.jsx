import { useEffect, useState } from 'react';

const DynamicToast = ({ show, message }) => {
  const [visible, setVisible] = useState(show);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const duration = 5000; // Duration in milliseconds
      const intervalDuration = 100; // Interval for updating the progress
      const decrement = 100 / (duration / intervalDuration);

      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - decrement;
          if (newProgress <= 0) {
            clearInterval(interval);
            return 0;
          }
          return newProgress;
        });
      }, intervalDuration);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      setVisible(false);
    }
  }, [show]);

  return (
    visible && (
      <div className="toast-container position-fixed p-3" style={{ zIndex: 1050, right: "0%", top: 100 }}>
        <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="mr-auto">Notification</strong>
            <button type="button" className="ml-2 mb-1 close" onClick={() => setVisible(false)} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">
            {message}
            <div className="progress mt-2">
              <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DynamicToast;
