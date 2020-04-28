import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiAlert from "@material-ui/lab/Alert";
import {Link} from  "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from "aws-amplify";
import MyContext from '../store/context';
// import Logo from "./mages/Logo.svg";
import { createMuiTheme } from '@material-ui/core/styles';


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
      margin: theme.spacing(2, 0, 5),
    },
  }));

const Login =  (props) => {
        const classes = useStyles();
        const [loadingStatus, setLoadingStatus] = useState(false);
        const registrationContext = React.useContext(MyContext);

        let [loginObj, setLogin] = useState({
          auth: {
            username: '',
            password: ''
          },
          errors:{
              cognito: ''
          }
        });

        const onInputChange = (e) => {
          setLogin({...loginObj, auth: { ...loginObj.auth, [e.target.name]:e.target.value }});
          console.log(loginObj);
        }

        const { auth } = loginObj;
        const { username, password } = auth;

        const handleSubmit = async e => {
          e.preventDefault();
          setLoadingStatus(true);

          try {
            console.log(auth);
              const loginResponse = await Auth.signIn(username, password);
              setLoadingStatus(false);
              props.history.push("/dashboard");

            } catch (error) {
              let err = null;
              !error.message ? err = { "message": error } : err = error;
              setLogin({...loginObj, errors: { cognito: err }});
              setLoadingStatus(false);
            }
      }

        return(
            <section className="wrapper">
              <div className="hero-bg">
                <img className="logo" src={require('../images/Logo.svg')}/>
                <h2>Exchange money 💰,<br></br>no matter where you are.</h2>
              </div>
              <div className="login-wrapper">
                <div className="login-form">
                <h1>Sign in to <span className="title">Troperial</span></h1>
                  <p>
                    Enter your email address & password <br></br>to sign In to Troperial
                  </p>

                  
                  { loginObj?.errors?.cognito?.message ?
                      <MuiAlert elevation={1} severity="error">{loginObj.errors.cognito.message}</MuiAlert>
                  : ''}

                  {(!loginObj.errors.cognito.message && registrationContext.setRegistrationStatus === true) ?
                      <MuiAlert elevation={1} severity="success">Registration successful, kindly login below</MuiAlert>
                  : ''}
                  
                  <form className={classes.form}  onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="username"
                          label="Email Address"
                          name="username"
                          autoComplete="off"
                          value={username}
                          onChange={onInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="off"
                          value={password}
                          onChange={onInputChange}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      {!loadingStatus? 'Sign In' : 'loading...'}
                    </Button>
                        <Grid container justify="flex-start">
                          <p className="link">Forgot your password? <Link to="/signup"> Click here </Link></p>
                          <p className="link">Don’t have an account?<Link to="/signup"> Sign up </Link></p>
                        <Grid>
                      </Grid>
                    </Grid>
                  </form>
                  <Grid container justify="flex-start">
                    <p className="footer">Having trouble signing in? <Link to="/signup"> Contact Support </Link></p>
                  </Grid>
                </div>
              </div>
            </section>
        )
}

export default Login;
