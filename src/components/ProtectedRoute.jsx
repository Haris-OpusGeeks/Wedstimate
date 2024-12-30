// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { isLoggedIn } from '../Redux/Reducers/authSlice';

const ProtectedRoute = ({ children }) => {
  // const isLoggedIn = useSelector((state) => );
  if (!localStorage.getItem('accessToken')){
    return <Navigate to="/couple-login" />;
  }

  return children;
};

export default ProtectedRoute;
