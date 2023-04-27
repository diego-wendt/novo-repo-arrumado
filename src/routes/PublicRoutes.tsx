import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register/Register';
import { ForgotPassword } from '../pages';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};
