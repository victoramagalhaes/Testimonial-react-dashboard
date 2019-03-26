import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import FormCorpo from './formBody';

import Logo from '../img/LOGO-SITE.png';

import {getJwt} from './jwt'

const URLGET = 'http://depoimentos-react.herokuapp.com/users/me';
const URL = "http://depoimentos-react.herokuapp.com/auth/local"

function Error(props){
    if(!props.err){
        return null
    }
    return(
        <div className="row justify-content-center">
        <br></br>
            <div className={`col-md-6 errorDiv`}>
            <p className="errorDiv__p"><i className="fas fa-exclamation-circle errorDiv__i"></i>Something went wrong.</p>
            </div>
        </div>
    )
}

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            identifier:'',
            password:'',
            error:false,
            role:undefined
        }
        this.onChange = this.onChange.bind(this);
        this.Login = this.Login.bind(this);
    }
    // Make a verify if user already have JWT, if so redirect.
    componentDidMount(){
        const jwt = getJwt();
        axios
        .get(URLGET, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        .then(res => {
            this.setState({
                role:res.data.role.id,
            })
        })
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    // API post to get JWT then set localStorage.
    Login(e){
        e.preventDefault()
        axios
        .post(URL, qs.stringify({ 'identifier': this.state.identifier , 'password': this.state.password }))
        .then(res => {
            localStorage.setItem('user-jwt', res.data.jwt)
            res.data.user.role.id === 1 || res.data.user.role.id === 2 ? this.props.history.push('/testimonial') : console.log('Something went wrong.')
        })
        .catch(error => {
            // Handle error.
            // console.log('An error occurred:', error);
            this.setState({error:true})
        });
    }
 render(){
    // if user already logged in, redirect.
    if(this.state.role === 1 || this.state.role === 2){
        this.props.history.push('/testimonial')
    }
    return(
        <div className="container-fluid bg-gostoso">
            <div className="row justify-content-center align-items-center fullsize">
                <div className="login">
                    <div className="col-md-12 text-center">
                        <img src={Logo} className="logo__margin" width="140px" height="110px" alt=""/>
                        <form onSubmit={this.Login}>
                            <FormCorpo 
                            onChange={e => this.onChange(e)}
                            identifier={this.state.identifier}
                            password={this.state.password}
                            />
                        </form>
                        <Error err={this.state.error}/>
                    </div>
                </div>
            </div>
        </div>
     );
 }
}
export default withRouter(Login);