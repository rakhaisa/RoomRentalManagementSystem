import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import logo from "assets/Logo.png";
import { Formik } from "formik";
import { setLogin } from "state";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import * as yup from "yup";

const Signup = () => {
  
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:6001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
   await register(values, onSubmitProps);
   navigate("/login");
  };

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    businessName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    address: yup.string().required("required"),
    occupation: yup.string().required("required"),
    //picture: yup.string().required("required"),
  });

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    occupation: "",
    picture: "",
  };

	{/*const [data, setData] = useState({
		firstName: "",
		lastName: "",
		businessName: "",
		address : "",
		phoneNumber :"",
		occupation :"",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const url = "http://localhost:6001/api/users";
		  const { data: res } = await axios.post(url, data);
		  navigate("/login");
		  console.log(res.message);
		} catch (error) {
		  if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
		  ) {
			setError(error.response.data.message);
		  }
		}
	  };*/}

	  return (
		<div className={styles.signup_container}>
		  <Box
			component="img"
			alt="logo"
			src={logo}
			height="79px"
			width="160px"
			display="flex"
			alignItems="center"
			gap="0.5rem"
			margin="4rem 1rem 1rem 1rem"
			sx={{ objectFit: "cover" }}
		  />
		 
        <Box>
          
        </Box>
        <Formik
         onSubmit={handleFormSubmit}
         initialValues={initialValuesRegister}
         validationSchema={registerSchema}
        >
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
			

        
			  
        <Box
        backgroundColor="#de9369"
        display="grid"
        gap="10px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          padding : "2rem",
          justifyContent: "center",
          borderRadius: "10px",
        }}
        >
          
          <Box sx={{ gridColumn: "span 4" }} >
            <Typography fontWeight="bold" fontSize="30px">
            Create Account
            </Typography>
          </Box>
          <Box sx={{ gridColumn: "span 2" }}>
          <Typography    > First Name </Typography>
        <input
          label="First Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
          name="firstName"
          error={
            Boolean(touched.firstName) && Boolean(errors.firstName)
          }
          helperText={touched.firstName && errors.firstName}
          
          className={styles.input}
        />
          </Box>
        
     <Box sx={{ gridColumn: "span 2" }}>
     <Typography >Last Name</Typography>
        <input
          label="Last Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName}
          name="lastName"
          error={Boolean(touched.lastName) && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
          className={styles.input}
        />

     </Box>

     <Box sx={{ gridColumn: "span 2" }}>
     <Typography >Business Name</Typography>
        <input
          label="Business Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.businessName}
          name="businessName"
          error={Boolean(touched.businessName) && Boolean(errors.businessName)}
          helperText={touched.businessName && errors.businessName}
          className={styles.input}
        />
     </Box>
     
     <Box sx={{ gridColumn: "span 2" }}>
     <Typography  >Address</Typography>
        <input
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.address}
          name="address"
          error={Boolean(touched.address) && Boolean(errors.address)}
          helperText={touched.address && errors.address}
          className={styles.input}
        />

     </Box>
     
     <Box sx={{ gridColumn: "span 2" }}>
     <Typography   >Phone Number</Typography>
        <input
        type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={
            Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
          }
          helperText={touched.phoneNumber && errors.phoneNumber}
          
          className={styles.input}
        />
      
      </Box>

      <Box sx={{ gridColumn: "span 2" }}>
      <Typography   >Occupation</Typography>        
    <input
         label="Occupation"
         onBlur={handleBlur}
         onChange={handleChange}
         value={values.occupation}
         name="occupation"
         error={
           Boolean(touched.occupation) && Boolean(errors.occupation)
         }
         helperText={touched.occupation && errors.occupation}
         
          className={styles.input}
        />
      
      </Box>

      <Box sx={{ gridColumn: "span 2" }}>
      <Typography  >Email</Typography>
        <input
           label="Email"
           onBlur={handleBlur}
           onChange={handleChange}
           value={values.email}
           name="email"
           error={Boolean(touched.email) && Boolean(errors.email)}
           helperText={touched.email && errors.email}
          className={styles.input}
        />
      </Box>

      <Box sx={{ gridColumn: "span 2" }}>
      <Typography>Password</Typography>
        <input
          label="Password"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          name="password"
          error={Boolean(touched.password) && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          className={styles.input}
        />
      </Box>
      <Box sx={{ gridColumn: "span 2" }}>
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
           REGISTER
          </Button>
         
    <Link to="/Login" sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light,
              },
            }}>
      <h4>Already have an account? Login here.</h4>		
    </Link>
        </Box>
        </Box>
       

			</form>
      )}
       
        </Formik>
        </div>
		  
		
	  );
};

export default Signup;