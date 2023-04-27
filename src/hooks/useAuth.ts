import { AuthContext } from '../contexts/Auth/AuthContext';
import { useContext } from 'react';
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};
