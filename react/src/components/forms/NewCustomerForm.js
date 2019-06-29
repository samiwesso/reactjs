import React, { Component } from 'react'
import http from 'axios'
import { Redirect } from 'react-router-dom'

const apiurl = 'http://localhost:3001/api'

class NewCustomerForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            Name: '',
            address: '',
            Zipcode: '',
            City: '',
            Email: '',
            Tele: '',
            isSaved: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) { this.setState({ [e.target.id]: e.target.value }) }
    onSubmit(e) {
        e.preventDefault()
        var config = {
            headers: {
                'content-type': 'application/json',
                'authorization': 'bearer ' + sessionStorage.getItem('jwt')
            }
        };
        http.post(apiurl+'/customers/', this.state, config)
            .then(() => {
                this.setState({ firstname: '' })
                this.setState({ lastname: '' })
                this.setState({ Name: '' })
                this.setState({ address: '' })
                this.setState({ Zipcode: '' })
                this.setState({ City: '' })
                this.setState({ Email: '' })
                this.setState({ Tele: '' })
                this.setState({ isSaved: true })
            })
    }


    render() {
        const { firstname, Name, lastname, address, Zipcode, City, Email, Tele, isSaved } = this.state
        if (isSaved == true) return <Redirect to='/CustomersList' />
        return (
            <div className="card text-center ">
                <form className="my-4" onSubmit={this.onSubmit}>
                    <h5 className="card-header"><i className="fas fa-id-card mr-3"></i> create customer</h5>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="firstname" >firstname</span>
                                    </div>
                                    <input type="text" className="form-control" id="firstname" placeholder=" firstname"
                                        aria-label="firstname" value={firstname} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="lastname" >lastname</span>
                                    </div>
                                    <input type="text" className="form-control" id="lastname" placeholder=" lastname"
                                        aria-label="lastname" value={lastname} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="Name" >company name</span>
                                    </div>
                                    <input type="text" className="form-control" id="Name" placeholder=" lastname"
                                        aria-label="Name" value={Name} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="address" >address</span>
                                    </div>
                                    <input type="text" className="form-control" id="address" placeholder=" address"
                                        aria-label="address" value={address} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="Zipcode" >postnumber</span>
                                    </div>
                                    <input type="text" className="form-control" id="Zipcode" placeholder=" Zipcode"
                                        aria-label="Zipcode" value={Zipcode} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="City" >City</span>
                                    </div>
                                    <input type="text" className="form-control" id="City" placeholder=" City"
                                        aria-label="City" value={City} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="Email" >E-postaddress</span>
                                    </div>
                                    <input type="text" className="form-control" id="Email" placeholder=" Email"
                                        aria-label="Email" value={Email} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text text-primary" htmlFor="Tele" >telephone number</span>
                                    </div>
                                    <input type="text" className="form-control" id="Tele" placeholder=" Telephone"
                                        aria-label="Tele" value={Tele} onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                        </div>
                        <div className="form-row">
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">create client</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewCustomerForm