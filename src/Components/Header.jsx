import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Logo from '../img/LOGO-SITE.png'

class Header extends Component {
    constructor(props){
        super(props)
        this.Logout = this.Logout.bind(this)
    }
    Logout(){
        const ask = window.confirm('Do you really want to exit?')
        if(ask){
            localStorage.removeItem('user-jwt');
            this.props.history.push('/');
        }
    }
    render(){
        return(
            <nav className="navbar navbar-light navbar-expand-md bg-light justify-content-between">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse dual-nav w-50 order-1 order-md-0">
                </div>
                <a href="/" className="navbar-brand mx-auto d-block text-center order-0 order-md-1 w-25">
                <img src={Logo} width="150px" height="110px" alt=""/>
                </a>
                <div className="navbar-collapse collapse dual-nav w-50 order-2">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                        <a className="nav-link" onClick={this.Logout}>
                        <i className="fas fa-sign-out-alt fa-lg" title="Logout"></i>
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        );
    }
}
export default withRouter(Header);