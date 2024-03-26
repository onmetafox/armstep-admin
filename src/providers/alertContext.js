import React, {createContext, useContext, useState} from 'react';

const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <AlertContext.Provider
      value={{
        message,
        setMessage,
        alertVisible,
        setAlertVisible
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export const useAlertContext = () => useContext(AlertContext)
