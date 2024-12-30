// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { isLoggedIn } from '../Redux/Reducers/authSlice';

const ProtectedLogin = ({ children }) => {
  // const isLoggedIn = useSelector((state) => );
  if (localStorage.getItem('accessToken')){
    return <Navigate to="/categories/couples/dashboard" />;
  }

  return children;
};

export default ProtectedLogin;
