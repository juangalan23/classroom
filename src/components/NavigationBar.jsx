import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {withRouter, Redirect} from 'react-router';
import App from './app.jsx';
import SignIn from './SignIn.jsx';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import TeacherMainView from './teachers/mainView.jsx';

import "grommet/scss/hpinc/index.scss";
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Headline from 'grommet/components/Headline';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Actions from 'grommet/components/icons/base/Action.js';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.checkAuth = this.checkAuth.bind(this);
    }
    checkAuth () {
        if (this.props.auth.authenticated === true) {
            if (this.props.auth.user.class === 'teacher') {
                return < Redirect to="/teachermainview"  /> 
            }
            else {
                if (this.props.auth.user.class === 'student') {
                    return < Redirect to="/login"  /> 
                }
            }
        }
        else {
            return < SignIn /> 
        }
    }
    
    render() {
        const titleStyle = {
            marginLeft: '50px'
        }
        return (
        <div>
            <Router history={this.props.history} >
                <nav className="navbar navbar-default"> 

            <Header
                size='medium'>
                <Headline margin='large' style={titleStyle} >
                    Jaqen
                </Headline>
                <Box flex={true}
                    margin='large'
                    justify='end'
                    direction='row'
                    responsive={false}>
                    <Menu 
                        primary={false}
                        direction='row'
                        label='Menu'
                        icon={<Actions/>}>
                        <Anchor href='#'>
                            < Link to="/login"> Login </Link>
                        </Anchor>
                        <Anchor href='#'>
                            < Link to="/signup"> Signup </Link>
                        </Anchor>
                        <Anchor href='#'>
                            Logout
                        </Anchor>
                    </Menu>
                </Box>
            </Header>

        
                        <Switch>
                            <Route path="/teachermainview" component={TeacherMainView} />
                            {/* <Route path="/studentmainview" component={TeacherMainView} /> */}
                            <Route exact path="/login"  render={
                                    this.checkAuth
                            } />  
                            <Route path="/login" component={SignIn}  />
                        </Switch>
                </nav>
                </Router>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
          // subject to change
          auth: state.auth
      }
  }
  
  function matchDispatchToProps(dispatch) {
      return bindActionCreators(actions, dispatch);
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(NavigationBar)


// export default NavigationBar;