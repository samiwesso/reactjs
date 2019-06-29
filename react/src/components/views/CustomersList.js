import React, { Component } from 'react'
import http from 'axios'
import Header from './Header'
import { Redirect, Link } from 'react-router-dom'
import { get,  logout } from '../../store/actions/authActions'

const apiurl = 'http://localhost:3001/api'

class CustomerList extends Component {
    constructor(props) {
        super(props)

        this.state = {
           customers: [] 
        }
    }
    
    componentDidMount() {
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.get(apiurl+'/customers/all',config).then(res => this.setState({ customers: res.data }))
    }

    
    render() {

        const customerList = this.state.customers.map( customer => (
            <tr key={customer._id}>
                <td>{customer.firstname} {customer.lastname}</td>
                <td>{customer.Name}</td>
                <td>{customer.address} {customer.Zipcode} {customer.City} </td>
                <td>{customer.Email}</td>
                <td>{customer.Tele}</td>
            </tr>
        ))

        return (
            <div>
            <Header user={JSON.parse(sessionStorage.getItem('user'))} logout={this.logout}/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6"> <h5><i className="fas fa-list mr-3"></i> Customers list</h5></div>
                    <div className="col-6" align="right"> <Link to="/NewCustmer"><i className="fas fa-plus mr-3"></i>New customer</Link></div>

                </div>
               

                <table className="table table-sm mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Contact person</th>
                            <th scope="col">Company name</th>
                            <th scope="col">Address</th>
                            <th scope="col">E-post</th>
                            <th scope="col">Telephone</th>
                        </tr>
                    </thead>
                    <tbody>
                        { customerList }
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}

export default CustomerList