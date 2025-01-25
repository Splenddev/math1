import { useContext } from 'react';
import Toast from './Toast';
import { StoreContext } from '../../context/StoreContext';

const ToastManager = () => {
  const { removeToast, toasts } = useContext(StoreContext);

  return (
    <div>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastManager;
