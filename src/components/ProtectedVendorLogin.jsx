// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { isLoggedIn } from '../Redux/Reducers/authSlice';

const ProtectedVendorLogin = ({ children }) => {
  // const isLoggedIn = useSelector((state) => );
  if (localStorage.getItem('accessToken')){
    return <Navigate to="/categories/vendor/dashboard" />;
  }

  return children;
};

export default ProtectedVendorLogin;
