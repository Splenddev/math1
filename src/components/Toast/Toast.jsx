/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Toast.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Toast = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 100;
    const decrement = (120 / duration) * interval;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressInterval);
          setIsVisible(false);
          onClose();
          return 0; // Notify parent to remove toast
        }
        return -decrement + prev;
      });
    }, interval);

    return () => clearTimeout(progressInterval);
  }, [duration, onClose]);

  return (
    isVisible && (
      <div className={`toast ${type}`}>
        <div className="toast-message-progress">
          <div className="toast-message">{message}</div>
          <div
            className="toast-progress"
            style={{ width: `${progress}%` }}></div>
        </div>
        <FontAwesomeIcon
          onClick={() => setIsVisible(false)}
          className="close"
          icon={faClose}
        />
      </div>
    )
  );
};

export default Toast;
