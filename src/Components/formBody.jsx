import React from 'react'

export default props =>(
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-md-10">
    <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
    </div>
    <input type="text" name="identifier" className="form-control form-aumento" onChange={props.onChange} value={props.identifier} placeholder="User" aria-label="user" aria-describedby="basic-addon1"></input>
    </div>
    </div>
    </div>
    <div className="row justify-content-center">
    <div className="col-md-10">
    <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1"><i className="fas fa-key"></i></span>
    </div>
    <input type="password" name="password" id="exampleInputPassword1" className="form-control form-aumento" onChange={props.onChange} value={props.password} placeholder="Password" aria-label="password" aria-describedby="basic-addon1"></input>
    </div>
    </div>
    </div>
    <div className="row justify-content-center">
    <div className="col-md-10">
        <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
    </div>
    </div>
    </div>
)