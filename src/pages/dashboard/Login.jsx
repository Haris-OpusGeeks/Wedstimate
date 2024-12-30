import { useFormik } from "formik"
import * as Yup from 'yup'
import {loginUser} from "../../Redux/Reducers/authSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUserProfile} from "../../Redux/Reducers/profileSlice.js";


export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginFormik = useFormik({
        initialValues: {
            email : '',
            password : ''
        },
        validationSchema: Yup.object({
            email : Yup.string().required('Required'),
            password: Yup.string().max(50, 'Must be Less than 50 characters').required('Required'),
        }),
        onSubmit: async (values) => {
            const requestData = {
                email : values.email,
                password: values.password,
            }
            try {
                await dispatch(loginUser({requestData}));
                await dispatch(getUserProfile());
                navigate('/dashboard');
            } catch (error) {
                console.error(error);
            }
        },
      });
  return (
    <>
        <div className="loginPage">
            <div className="container-fluid">
                <div className="loginDiv">
                    <div className="header">
                        <h2>Wedstimate</h2>
                    </div>
                    <div className="login">
                        <form onSubmit={loginFormik.handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input type="email" name="email" id="email" onChange={loginFormik.handleChange} value={loginFormik.values.email} />
                            {loginFormik.errors.email}
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={loginFormik.handleChange} value={loginFormik.values.password} />
                            {loginFormik.errors.password}
                            <input type="submit" value="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}