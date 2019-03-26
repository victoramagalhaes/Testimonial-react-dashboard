import React, {Component} from 'react';

import axios from 'axios';
import Loading from './loader'

import { getJwt } from './jwt';
import { withRouter } from 'react-router-dom'

const URL = 'http://depoimentos-react.herokuapp.com/users/me';

class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: undefined
        }
    }
    componentDidMount(){
        const jwt = getJwt();
        if(!jwt){
            this.props.history.push('/');
        }
        const token = jwt;
        // Request API.
        axios
          .get(URL, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => this.setState({
                user:res.data.role.id,
          }))
          .catch(err => {
            // Handle error.
            localStorage.removeItem('user-jwt');
            this.props.history.push('/');
          });
    }
    render(){
        if(this.state.user === undefined){
            return (
                <Loading/>
            );
            
        }
            return(
                <div>
                {this.props.children}
                </div>
            );
    }
}
export default withRouter(Auth);