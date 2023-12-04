import { Box, Button,  InputBase,  Typography,  styled } from '@mui/material'
import React, { useEffect, useState } from 'react' 
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import {auth, provider } from '../utils/firebase';


const LoginContainer = styled(Box)`
    display: flex; 
    align-items: center;
    justify-content: center; 
    flex-direction: column; 
    padding: 50px; 
    box-sizing: border-box;
    background:   ${(props) => props.theme.palette.primary.main}; 
    ${(props) => props.theme.breakpoints.down('sm')} {
       padding:  25px 15px; 
    }
` 

const Option = styled(Box)`
     display: flex; 
     gap: 10px;
     align-items: center;
     width: 100%;
     justify-content: flex-end;
     > p {
        color:  ${(props) => props.theme.palette.secondary.main}; ;
        font-weight: 400;
        font-size: 16px;
        font-family: 'Fira Sans', sans-serif;
        white-space: nowrap;
        ${(props) => props.theme.breakpoints.down('sm')} {
          font-size: 12px;
        }
     }
     > button {
        color:  ${(props) => props.theme.palette.secondary.soft}; 
        font-weight: 400; 
        padding: 8px 8px;
        box-sizing: border-box;
        background: ${(props) => props.theme.palette.secondary.seperate}; 
        border-radius: 20px;
        width: 100px; 
        font-size: 14px;
        font-family: 'Fira Sans', sans-serif;
        ${(props) => props.theme.breakpoints.down('sm')} {
          font-size: 12px;
          padding: 6px 4px;
          width:  50px; 
       }
     }
`
const Form = styled(Box)`
     background:  ${(props) => props.theme.palette.primary.soft}; 
     width: 50%;
     ${(props) => props.theme.breakpoints.down('lg')} {
       width: 60%;
    }
     ${(props) => props.theme.breakpoints.down('md')} {
       width: 80%;
    }
     ${(props) => props.theme.breakpoints.down('sm')} {
       width: 100%;
       padding: 15px 10px;
    }
     border-radius: 24px;
     padding: 20px 30px;
     border: 1px solid #1E73BE; 
     box-shadow: 0px 30px 70px 0px rgba(137, 139, 142, 0.15);
     > div {
        width: 100%; 
        border-bottom: 1px solid ;
        border-color: ${(props) => props.theme.palette.secondary.soft}; 
        margin: 15px 0; 
     } 
     > button {
      background: linear-gradient(to right, #1E73BE, #00BFEF);
      font-family: 'Fira Sans Condensed', sans-serif;  
      height: 26px;
      width: 160px;
      padding: 25px 50px;
      font-weight: 400;
      font-size: 16px;
      line-height: 26px; 
      color: #fff;
      border-radius: 50px;
      margin: 20px 0;
      cursor: pointer;  
      -webkit-transition: all 0.3s ease 0s;
      -o-transition: all 0.3s ease 0s;
      transition: all 0.3s ease 0s;  
      ${(props) => props.theme.breakpoints.down('sm')} {
        padding: 20px 20px;
        font-size: 14px;
        line-height: 26px;    
        height: 26px;
        width: 100px;
        font-size: 14px;
        line-height: 16px; 
      }  
     }
     > p {
      color:  ${(props) => props.theme.palette.secondary.soft}; ;
      font-weight: 400;
      font-size: 16px;
      font-family: 'Fira Sans', sans-serif;
      text-align: center;
      margin-bottom: 20px;
     }

` 
const GoogleBtn = styled(Button)`
    &.googleLogin {
      color:  ${(props) => props.theme.palette.secondary.soft}; 
      background:  ${(props) => props.theme.palette.primary.main}; 
      font-weight: 400;
      font-size: 18px;
      font-family: 'Fira Sans Condensed', sans-serif;
      width: 100%;
      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size:  14px;
      }
    }
`

const Login = ({setOpen}) => {
    const [registered, setRegistered] = useState(false);
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserData = (e) => { 
      setUserData({ ...userData,  [e.target.name] : e.target.value  } );  
    }

    const signUpUser = async () => { 
      try {
        const {data} = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVERURI}/api/auth/signup`,
            data: userData
        }) 

        if(data.success){
            setRegistered(true);
            setUserData({});
        }else{ 
            toast.error(data.message);
        }

        }
        catch (error) {
          console.log(error);
          if (error.response) {
            console.log(error.response.data.message  || error.response.data.errors);   //Server Error
            toast.error(error.response.data.message || error.response.data.errors);
          } else if (error.request) {
            console.log("Request Error:", error.request);
          } else {
            console.log("Something went wrong:", error.message);
          }
        }
    }

    const loginUser = async (e) => { 
      dispatch(loginStart());
      try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVERURI}/api/auth/login`,
            data: userData
        }) 

        if(response.data.success){ 
            dispatch(loginSuccess({ user: response.data.user, authToken: response.headers['auth-token'] }) );
            navigate('/');
        }else{ 
           console.log(response.data.message);
           toast.error(response.data.message);
        }

        }
        catch (error) {
          dispatch(loginFailure());
          if (error.response) {
            console.log(error.response.data.errors || error.response.data.message );   //Server Error
            toast.error(error.response.data.errors || error.response.data.message);
          } else if (error.request) {
            console.log("Request Error:", error.request);
          } else {
            console.log("Something went wrong:", error.message);
          }
        }
    }

    const googleLogin = async (user) => { 
      dispatch(loginStart());
      try {
          const response = await axios({
              method: 'post',
              url: `${process.env.REACT_APP_SERVERURI}/api/auth/googleAuth`,
              data: {
                username:  user.displayName,
                email:  user.email,
                img:  user.photoURL,
              }
          }) 

          if(response.data.success){ 
            console.log(response);
              dispatch(loginSuccess({ user: response.data.savedUser, authToken: response.headers['auth-token'] }) );
              navigate('/');
          }else{ 
            console.log(response.data.message);
            toast.error(response.data.message);
          }

        }
        catch (error) {
          dispatch(loginFailure());
          if (error.response) {
            console.log(error.response.data.errors || error.response.data.message );   //Server Error
            toast.error(error.response.data.errors || error.response.data.message);
          } else if (error.request) {
            console.log("Request Error:", error.request);
          } else {
            console.log("Something went wrong:", error.message);
          }
        }
    }

    const LoginWithGoogle = () => {
      signInWithPopup(auth, provider)
      .then((result) => {          
         googleLogin(result.user);     //API call
      }).catch(error => {
        console.log(error);
        toast.error("Something went wrong, Please try again")
      })
    }

    useEffect(() => {
      setOpen(false);
    },[])
 
  return (
    <LoginContainer   >  

        {
            registered   ?
             <Form> 
               <GoogleBtn className='googleLogin'
               onClick={LoginWithGoogle}
               >Login with Google</GoogleBtn> 
               <Typography>OR</Typography>

             <InputBase  placeholder="Username" type='text'
              name='username'
              autoComplete='off'
              onChange={getUserData}
              inputProps={{ sx:  {
                  color: '#fff' , 
                  fontFamily: 'Fira Sans, sans-serif',
                  fontSize: '16px',
                  lineHeight: '20px', 
                  fontWeight: '400',
                  color:  `${(props) => props.theme.palette.secondary.main}` , 
                  textTransform: 'capitalize',
                  [`@media (max-width: 600px)`]: {
                    fontSize: '14px',
                    lineHeight: '18px',
                  },
                }
              }}
              >
             </InputBase>     

             <InputBase  placeholder="Password"  
             name='password'
              type='text' 
              autoComplete='off'
              onChange={getUserData}
              inputProps={{ sx:  {
                  color: '#fff' , 
                  fontFamily: 'Fira Sans, sans-serif',
                  fontSize: '16px',
                  lineHeight: '20px', 
                  fontWeight: '400',
                  color:  `${(props) => props.theme.palette.secondary.main}`,
                  [`@media (max-width: 600px)`]: {
                    fontSize: '14px',
                    lineHeight: '18px',
                  },
                }
              }} 
              >
             </InputBase>   

             <Button onClick={loginUser}> Login </Button> 
              
              <Option component='span'>
                <Typography>Don't have an account yet ?</Typography>
                <Button type='text' 
                 onClick={() => setRegistered(false) }> Sign Up</Button> 
              </Option>

             </Form>
             : 
            <Form> 
                <InputBase  placeholder="Username" autoComplete='off'
                 name='username'
                 onChange={getUserData}
                 inputProps={{ sx:  {
                    color: '#fff' , 
                    fontFamily: 'Fira Sans, sans-serif',
                    fontSize: '16px',
                    lineHeight: '20px', 
                    fontWeight: '400',
                    color:  `${(props) => props.theme.palette.secondary.main}` , 
                    textTransform: 'capitalize',
                    [`@media (max-width: 600px)`]: {
                      fontSize: '14px',
                      lineHeight: '18px',
                    },
                    }
                }} >
                </InputBase>   
                <InputBase  placeholder="Email" type='email'  autoComplete='off'
                name='email'
                onChange={getUserData}
                inputProps={{ sx:  {
                    color: '#fff' , 
                    fontFamily: 'Fira Sans, sans-serif',
                    fontSize: '16px',
                    lineHeight: '20px', 
                    fontWeight: '400',
                    color:  `${(props) => props.theme.palette.secondary.main}` ,  
                    [`@media (max-width: 600px)`]: {
                      fontSize: '14px',
                      lineHeight: '18px',
                    },
                    }
                }} >
                </InputBase>   
                
                <InputBase  placeholder="Password" autoComplete="off"
                 type='text' 
                 onChange={getUserData}
                name='password'
                inputProps={{ sx:  {
                    color: '#fff' , 
                    fontFamily: 'Fira Sans, sans-serif',
                    fontSize: '16px',
                    lineHeight: '20px', 
                    fontWeight: '400',
                    color:  `${(props) => props.theme.palette.secondary.main}` ,  
                    [`@media (max-width: 600px)`]: {
                      fontSize: '14px',
                      lineHeight: '18px',
                    },
                    }
                }} >
                </InputBase>   

                <Button
                onClick={signUpUser}
                >
                  Sign Up
                </Button>
                
                <Option component='span'>
                    <Typography>Already have an account ?</Typography>
                    <Button type='text' 
                    onClick={() => setRegistered(true) } >Login</Button> 
                </Option>

            </Form>
        } 
      
    </LoginContainer>
  )
}

export default Login
