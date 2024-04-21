
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NotFound from './Components/NotFound';
import DashboardRoutes from './Routes/DashboardRoutes';
import HomeRoutes from './Routes/HomeRoutes';
import { colors } from './utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logout } from './store/actions/authAction';
import instance from './services/axios';


function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    const handleTokenExpiration = (error) => {
      if (error?.response?.data?.message === "Unauthorized - Invalid token") {
        // Handle token expiration here
        // For example, log out the user and navigate to the login screen
        // You may need to dispatch the logout action based on your setup
        dispatch(logout());
        navigate('/login');
      }
    };

    // Attach the handleTokenExpiration function to the response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        handleTokenExpiration(error);
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
  return (
    <div style={{backgroundColor:colors.bgWhite, height:"auto"}} >
      <Routes>
      {/* <Route path="/*" element={navigate('/login')} /> */}
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
