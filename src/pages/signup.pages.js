import React, {Component, useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link'; 
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Auth } from "aws-amplify";
import MyContext from '../store/context';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const Signup =  (props) => {
        const classes = useStyles();
        const registrationContext = React.useContext(MyContext);

        const [loadingStatus, setLoadingStatus] = useState(false)
        const [registrationObj, setRegistration] = useState({
            auth: {
                username: 'ddd@y.c',
                password: 'Adkjfjk@11',
                phoneNumber: '+123456789'
            },
            errors:{
                cognito: ''
            }
        });

        // Emmulate componentDidMount lifecycle
        useEffect(() => {
            console.log(registrationContext);
        }, []);

        // This is for counter state variable
        useEffect(() => {
            console.log(registrationObj);
        }, [registrationObj]);

        const clearErrorState = () => {
            setRegistration({...registrationObj,
                errors: {
                    cognito: null
                  }
            });
          }


        const onInputChange = (e) => {
            setRegistration({...registrationObj, auth: { ...registrationObj.auth, [e.target.name]:e.target.value }});
            console.log(registrationObj);
        }

        const handleSubmit = async e => {
            e.preventDefault();
            setLoadingStatus(true);

            try {
                const { auth } = registrationObj;
                const { username, password, phoneNumber } = auth;
                
                const signUpResponse = await Auth.signUp({
                  username,
                  password,
                    attributes: {
                        phone_number: phoneNumber,   // optional 
                    }
                });

                registrationContext.setEmail(username);
                registrationContext.setPhoneNumber(phoneNumber);
                setLoadingStatus(false);
                props.history.push("/complete-registration");

              } catch (error) {
                  console.log(error);
                let err = null;
                !error.message ? err = { "message": error } : err = error;
                setRegistration({...registrationObj, errors: { cognito: err }});
                setLoadingStatus(false);
              }
        }

        const { auth } = registrationObj;
        const { username, password, phoneNumber } = auth;

        return(
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                T
              </Avatar>
              <Typography component="h1" variant="h5">
                 Toperial Registrations
              </Typography>
              { registrationObj?.errors?.cognito?.message ?
                   <MuiAlert elevation={1} severity="error">{registrationObj.errors.cognito.message}</MuiAlert>
                //   <div className="alert alert-error">{registrationObj.errors.cognito.message}</div>
              : ''}
              
              <form className={classes.form}  onSubmit={ handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      type="email"
                      label="Email Address"
                      name="username"
                      value={username}
                      autoComplete="username"
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                        min="6"
                      name="password"
                      label="Password"
                      type="password"
                      onChange={onInputChange}
                      value={password}
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="phone"
                      type="phone"
                      label="Phone Number"
                      name="phoneNumber"
                      value={phoneNumber}
                      autoComplete="phoneNumber"
                      onChange={onInputChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                {!loadingStatus? 'Proceed' : 'loading...'}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )
}

export default Signup;
