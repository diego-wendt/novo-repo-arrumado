import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL_API } from '../../services/configService';
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const signIn = async (mail: string, password: string) => {
    try {
      const URL = `${URL_API}/auth/login`;
      const { data } = await axios.post(URL, { mail, password });
      setToken(data.data);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: data.data.id,
          name: data.data.name,
          mail: data.data.mail,
          cnpj: data.data.cnpj,
          phone: data.data.phone,
          owner: data.data.owner,
        }),
      );
      setUserData({
        id: data.data.id,
        name: data.data.name,
        mail: data.data.mail,
        cnpj: data.data.cnpj,
        phone: data.data.phone,
        owner: data.data.owner,
      });
      setIsAuthenticated(true);
      toast.success('Login realizado com sucesso!', {
        position: 'bottom-right',
      });
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        toast.error('Usuário ou senha inválidos!', {
          position: 'bottom-right',
        });
      }
      if (error.response.data.statusCode === 401) {
        toast.error('Acesso negado. Você receberá um e-mail para finalizar o seu cadastro!', {
          position: 'bottom-right',
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ token, signIn, isAuthenticated, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
