import React, { Component } from 'react'
import RegisterForm from '../forms/RegisterForm'
import { Redirect } from 'react-router-dom'
import HeaderRegis from './NavigationRegis'

class Register extends Component {


    render() {
        const { authError, token } = this.props;
        if(sessionStorage.getItem('jwt')!==null ) return <Redirect to='/login' />
        var authErrorClass;
        if (authError) {
            authErrorClass= "alert-danger";
        } 
        return(
            <div>
                 <HeaderRegis />
            <div className="container my-5" align="center">
                <RegisterForm />
            </div>   
            </div>
        )
    }

}

export default Register