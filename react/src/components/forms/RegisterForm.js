import React, { Component } from 'react'
import { register } from '../../store/actions/authActions'

import { connect } from 'react-redux'


class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            addressline: '',
            zipcode: '',
            city: '',
            country: 'Sweden',
            termsaccept: false
        }
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 &&
            this.state.firstname.length > 0 &&
            this.state.termsaccept == true;
    }
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleChangeckB = e => {
        console.log(e.target.checked)
        this.setState({ [e.target.id]: !e.target.checked })
        console.log(this.state.termsaccept)
    }

    handleSubmit = e => {
        e.preventDefault()

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            addressline: this.state.addressline,
            zipcode: this.state.zipcode,
            city: this.state.city,
            country: this.state.country,
            email: this.state.email,
            password: this.state.password,
            termsaccept: this.state.termsaccept
        }

        this.props.register(user)
    }

    render() {
        const { firstname, lastname, email, password, addressline, zipcode, city, country, termsaccept } = this.state
        const { authError, regsuccess } = this.props
        var authErrorClass;
        var massage;
        if (regsuccess) {
            authErrorClass = "alert-primary";
            massage = "register success";
        }
        else {
            if (authError) {
                authErrorClass = "alert-danger";
                massage = authError;
            }
        }

        return (
            <div>
                <h2 className="text-primary">Register</h2>
                <div className={`alert ${authErrorClass}`} role="alert">{massage}</div>
                <div className="card text-center ">
                    <form onSubmit={this.handleSubmit}>
                        
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text size" htmlFor="firstname" >First Name</span>
                                        </div>
                                        <input type="text" className="form-control" id="firstname" placeholder="Name"
                                            aria-label="firstname" placeholder="First Name" value={firstname} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text size" htmlFor="lastname" >Last Name</span>
                                        </div>
                                        <input type="text" className="form-control" id="lastname" placeholder=" Last Name"
                                            aria-label="firstname" value={lastname} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" htmlFor="email" >Email</span>
                                        </div>
                                        <input type="text" className="form-control" id="email" placeholder=" Email"
                                            aria-label="email" value={email} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text size" htmlFor="password" >Password</span>
                                        </div>
                                        <input type="password" className="form-control" id="password" placeholder=" password"
                                            aria-label="password" value={password} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text col-md-12" htmlFor="addressline" >Address</span>
                                        </div>
                                        <input type="text" className="form-control" id="addressline" placeholder=" Address"
                                            aria-label="addressline" value={addressline} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text size" htmlFor="zipcode" >zipcode</span>
                                        </div>
                                        <input type="text" className="form-control" id="zipcode" placeholder=" password"
                                            aria-label="zipcode" value={zipcode} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text size" htmlFor="city" >City</span>
                                        </div>
                                        <input type="text" className="form-control" id="city" placeholder=" city"
                                            aria-label="city" value={city} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group col-md-5">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text size" htmlFor="country" >Country</span>
                                        </div>
                                        <select id="country" className="form-control" value={country} onChange={this.handleChange}>
                                            <option value="Sweden">Sweden</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Finnland">Finnland</option>
                                            <option value="Denmark">Denmark</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="termsaccept" value={termsaccept} defaultChecked={termsaccept}
                                        onChange={this.handleChangeckB} />
                                    <label className="form-check-label" htmlFor="termsaccept">
                                        I accept the user terms and agreement.
                                   </label>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" >Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        authError: state.profile.authError,
        token: state.profile.token,
        regsuccess: state.profile.regsuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (credentials) => dispatch(register(credentials))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)