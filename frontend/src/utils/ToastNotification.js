/**
  * ToastNotification response messages alert.
  * @name ToastNotification
  * @param {any} value - The value to be string.
  * @returns {function} - The  value as a componet.
  * @version 1.0.0
 */


// ToastNotification.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';

const TOAST_CONTAINER_ID = 'my-toast-container';

const ToastNotification = () => {
  return (
    <ToastContainer
      containerId={TOAST_CONTAINER_ID}
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
      limit={1}  // Only one toast will be shown at a time
    />
  );
};

const toastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
  containerId: TOAST_CONTAINER_ID,
};

let currentToastId = null;

export const showToast = (type, message) => {
  // If there's an active toast, dismiss it immediately
  if (currentToastId && toast.isActive(currentToastId)) {
    toast.dismiss(currentToastId);
  }

  // Show the new toast and store its ID
  switch (type) {
    case 'success':
      currentToastId = toast.success(message, toastOptions);
      break;
    case 'error':
      currentToastId = toast.error(message, toastOptions);
      break;
    case 'warning':
      currentToastId = toast.warning(message, toastOptions);
      break;
    case 'info':
      currentToastId = toast.info(message, toastOptions);
      break;
    default:
      currentToastId = toast(message, toastOptions);
  }
};

export default ToastNotification;