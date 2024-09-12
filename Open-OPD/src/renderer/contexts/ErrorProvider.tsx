import Channels from 'Channels';
import React, { useState, createContext } from 'react';

interface ErrorContextProps {
  errors: string[];
  addError: (error: string) => void;
  removeError: (error: string) => void;
  hasErrors: boolean;
}

export const ErrorContext = createContext<ErrorContextProps>({
  errors: [],
  addError: () => {},
  removeError: () => {},
  hasErrors: false,
});

export default function ErrorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const hasErrors = errors.length > 0;

  const removeError = (error: string) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      const index = newErrors.indexOf(error);
      if (index > -1) {
        newErrors.splice(index, 1);
      }
      return newErrors;
    });
  };

  const addError = (error: string) => {
    setErrors([...errors, error]);
    setTimeout(() => {
      removeError(error);
    }, 5000);
  };

  window.electron.ipcRenderer.on(Channels.ERROR, (args) => {
    if (typeof (args as string[])?.at(0) === 'string') {
      addError((args as string[])[0]);
    }
  });

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError, hasErrors }}>
      <div>{children}</div>
      <div className="absolute left-2 bottom-2 flex flex-col gap-1">
        {errors.map((error) => (
          <div
            key={`err-${Math.random() * 1000}`}
            className="bg-red-500 text-white text-center p-2 rounded"
          >
            {error}
          </div>
        ))}
      </div>
    </ErrorContext.Provider>
  );
}
