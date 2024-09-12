import { useContext } from 'react';
import { ErrorContext } from 'renderer/contexts/ErrorProvider';

export default function useErrors() {
  const { errors, addError, removeError, hasErrors } = useContext(ErrorContext);
  return { errors, addError, removeError, hasErrors };
}
