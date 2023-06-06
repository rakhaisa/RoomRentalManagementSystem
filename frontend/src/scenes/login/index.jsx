import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import {
	Box,
	Button,
	useMediaQuery,
	useTheme,
  } from "@mui/material";
import logo from "assets/Logo.png";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from '../../state/index';



const Login = () => {
	const [error, setError] = useState("");
	
	const loginSchema = yup.object().shape({
		email: yup.string().email("invalid email").required("required"),
		password: yup.string().required("required"),
	  });
	
	  const initialValuesLogin = {
		email: "",
		password: "",
	  };

 	const { palette } = useTheme();
  	const dispatch = useDispatch();
  	const navigate = useNavigate();
  	const isNonMobile = useMediaQuery("(min-width:600px)");
  
	  {/*  const login = async (values, onSubmitProps) => {
		try {
		  const response = await axios.post("http://localhost:6001/auth/login", values);
		  const loggedIn = response.data;
	  
		  onSubmitProps.resetForm();
		  
		  if (loggedIn) {
			dispatch(
			  setLogin({
				userId: loggedIn.user,
				token: loggedIn.token,
			  })
			);
			navigate("/dashboard");
		  }
		} catch (error) {
		  // Handle any errors that occurred during the login request
		  console.error("Login error:", error);
		}
	  };
	
	  const handleFormSubmit = async (values, onSubmitProps) => {
		await login(values, onSubmitProps);
	  };*/}

	
	  const handleFormSubmit = async (values, onSubmitProps) => {
		try {
		  const url = "http://https://easykos-backend.onrender.com/auth/login";
		  const { data: res } = await axios.post(url, values);
		  localStorage.setItem("token", res.data);
		  window.location = "/";
		} catch (error) {
		  if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
		  ) {
			setError(error.response.data.message);
		  }
		}
	  };

	



	return (
		<div className={styles.login_container} >
			<Box    
				component="img"
                alt="logo"
                src={logo}
				height="79px"
                width="160px"
                display="flex" 
                alignItems= "center"
                gap="0.5rem"
				margin="4rem 1rem 1rem 1rem"
                sx={{ objectFit: "cover" }}
                
              />  
			<div className={styles.login_form_container}>
				<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValuesLogin}
				validationSchema={loginSchema}>
					{({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => ( 
		<form className={styles.form_container} onSubmit={handleSubmit}>
						
						<h3>Email</h3>
						<input
							label="Email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name="email"
							error={Boolean(touched.email) && Boolean(errors.email)}
							helperText={touched.email && errors.email}
							sx={{ gridColumn: "span 4" }}
							className={styles.input}
						/>
						<h3>Password</h3>
						<input
							label="Password"
							type="password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name="password"
							error={Boolean(touched.password) && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							sx={{ gridColumn: "span 4" }}
							className={styles.input}
						/>
						
						<Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "1rem 0",
                p: "0.5rem",
				fontSize: "14px",
				fontWeight: "bold",
                backgroundColor: palette.primary.main,
                color: palette.primary.contrastText,
                "&:hover": { color: palette.primary.main, backgroundColor: palette.secondary.main },
              }}
            >
             Login
            </Button>
           
			<Link to="/signup" sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}>
				<h4>Don't have an account? Sign Up here.</h4>		
			</Link>
			{error && <div className={styles.error_msg}>{error}</div>}
          </Box>
						
					</form>

	  )}
				
				</Formik>
				
			</div>			
		</div>
	);
	};

export default Login;
