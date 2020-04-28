import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, NavLink } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import Signup from './pages/signup.pages';
import Signup2 from './pages/signup-2.pages';
import Login from './pages/login.pages';
import Provider from './store/provider';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0383EF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Provider>
            <div className="App">
              <Router>
                {/* <nav>
                      <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                      <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
                      <li><NavLink to="/complete-registration" activeClassName="active">Signup 2</NavLink></li>
                </nav> */}
                <Switch>
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/complete-registration" component={Signup2} />
                    <Route exact path="/login" component={Login} />
                    <Redirect from="*" to="/login" />
                </Switch>
              </Router>
            </div>
        </Provider>
    </ThemeProvider>
  );
}

export default App;
