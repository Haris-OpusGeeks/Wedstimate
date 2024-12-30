// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { isLoggedIn } from '../Redux/Reducers/authSlice';

const ProtectedLogin = ({ children }) => {
  if (localStorage.getItem('accessToken')){
      return <Navigate to="/dashboard" />;
  } else {
    return children;
  }

};

export default ProtectedLogin;
