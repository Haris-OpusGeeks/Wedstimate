// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { isLoggedIn } from '../Redux/Reducers/authSlice';

const ProtectedVendorRoute = ({ children }) => {
  // const isLoggedIn = useSelector((state) => );
  if (!localStorage.getItem('accessToken')){
    return <Navigate to="/vendor-login" />;
  }

  return children;
};

export default ProtectedVendorRoute;
