import React, {Component, useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyContext from '../store/context';
import config from '../config';

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

const Signup2 =  (props) => {
        const classes = useStyles();
        const [loadingStatus, setLoadingStatus] = useState(false);
        const registrationContext = React.useContext(MyContext);

      let [registrationObj, setRegistration] = useState({
        personId: Math.random(1111, 9999),
        userAlias: "foo_bar",
        firstName: '',
        lastName: '',
        middleName: "",
        dateOfBirth: "1986-05-01",
        address: {
            type: "HOME",
            addressLines: [
                "Flat 1100 Something Blvd",
                "Apy 77889"
            ],
            city: "Harrison",
            state: "NJ",
            country: "USA",
            postalCode: "12345"
        },
        emailAddress: {
            email: registrationContext.email
        },
        nationalIdentifier: {
            countryCode: "USA",
            nationalId: Math.random(1111, 9999),
            type: "SSN"
        },
        phoneNumber: {
            country: "USA",
            number: registrationContext.phoneNumber,
            countryCode: "+1"
        }
    });

      // Emmulate componentDidMount lifecycle
      useEffect(() => {
          console.log("welcome");
          if(!registrationContext.email){ // redirect if step 1 is incomplete
            props.history.push("/signup");
          }
      }, []);

      // This is for counter state variable
      useEffect(() => {
          console.log(registrationObj);
      }, [registrationObj]);

        const onInputChange = (e) => {
           setRegistration({...registrationObj, [e.target.name] : e.target.value});
          console.log(registrationObj);
        }
        
        // Emmulate componentDidMount lifecycle
        useEffect(() => {
          console.log(registrationContext);
      }, []);


      const handleSubmit = async e => {
      
        e.preventDefault();
        console.log(registrationObj);
        setLoadingStatus(true);
        try {
            const createPersonResponse = await fetch(`${config.api.url}/persons` , {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(registrationObj)
            });

            const result = await createPersonResponse.json();
            console.log(result);
            setLoadingStatus(false);
            if(result.personId){
              registrationContext.setRegistrationStatus(true);
              props.history.push("/login");
            }
            

          } catch (error) {
              console.log(error);
              setLoadingStatus(false);
          }
    } 
        return(
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Complete Registration
              </Typography>
              <form className={classes.form}  onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"  
                      name="firstName"
                      value={registrationObj.firstName}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName" 
                      value={registrationObj.lastName}
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
                  {!loadingStatus? 'Complete Registration' : 'loading...'}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )
}

export default Signup2;
