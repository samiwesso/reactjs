import React, { Component } from 'react'

class LoginForm extends Component {
    validateForm() {
        return this.props.cred.email.length > 0 && this.props.cred.password.length > 3;
    }
    render() {
        return (
        <div><h2 className="text-primary">LOGIN</h2>
            <div className="countainer col-md-10">
                <div className="card text-center col-md-12">
                    <form onSubmit={this.props.onSubmit}>
                        <div className="card-body mt-4 mb-4">
                            <div className="form-group col-md-12">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="email" >Email</span>
                                    </div>
                                    <input type="text" className="form-control" id="email" placeholder=" Email"
                                        aria-label="email" value={this.props.cred.email} onChange={this.props.onChange} />
                                </div>
                            </div>
                            <div className="form-group col-md-12">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="password" >Password</span>
                                    </div>
                                    <input type="password" className="form-control" id="password" placeholder=" password"
                                        aria-label="password" value={this.props.cred.password} onChange={this.props.onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer col-md-12">
                            <button type="submit" className="btn btn-primary" disabled={!this.validateForm()}>Login</button>
                            <span className="ml-2">Remember to click two times on Login button</span>
                        </div>
                    </form>
                </div>
            </div>
            </div>

        )
    }
}

export default LoginForm