import React, {useEffect} from 'react';
import {CToast, CToastBody, CToastClose} from "@coreui/react";
import {useAlertContext} from "../providers/alertContext";

export default function ToastDialog() {
  const {message, alertVisible, setAlertVisible} = useAlertContext();

  useEffect(() => {
    if (alertVisible) {
      setTimeout(() => setAlertVisible(false), 5000);
    }
  }, [alertVisible])

  return (
    <CToast visible={alertVisible} color="success" className="text-white toastDialog">
      <div className="d-flex">
        <CToastBody>{message}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
}
