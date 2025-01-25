/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // useState
  // useState
  const [allValuesInputed, setAllValuesInputed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const pages = ['/', '/cart', '/points', '/details'];
  const currIndex = pages.indexOf(location.pathname);
  function nextPage() {
    if (currIndex < pages.length - 1) {
      navigate(pages[currIndex + 1]);
    }
  }
  function prevPage() {
    if (currIndex > 0) {
      navigate(pages[currIndex - 1]);
    }
  }
  function removeCoefficient(demo) {
    return demo.replace(/\b1([a-zA-Z])/g, '$1');
  }
  function hasTwoDecimalPlace(num) {
    const numStr = num.toString();
    const decIndex = numStr.indexOf('.');
    if (decIndex === -1) {
      return false;
    }
    return numStr.length - decIndex > 3;
  }
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };
  const contextValue = {
    nextPage,
    allValuesInputed,
    isLoading,
    setIsLoading,
    setAllValuesInputed,
    prevPage,
    addToast,
    removeToast,
    toasts,
    removeCoefficient,
    hasTwoDecimalPlace,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
