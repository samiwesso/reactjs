import React, { Component } from 'react'
import http from 'axios'
import { Redirect } from 'react-router-dom'

const apiurl = 'http://localhost:3001/api'

class NewCaseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer: '',
            subject: '',
            body: '',
            createdBy:sessionStorage.getItem('_uid'),
            isSaved: false,
            customers: []
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.get(apiurl+'/customers/all',config).then(res => this.setState({ customers: res.data }))
    }
    
    onChange(e) { this.setState({ [e.target.id] : e.target.value })}
    onSubmit(e) {
        e.preventDefault()
        var config = {
            headers: { 'content-type': 'application/json',
                        'authorization': 'bearer ' + sessionStorage.getItem('jwt')}
        };
        http.post(apiurl+'/cases/', this.state,config)
        .then(() => {
            this.setState({ customer: '' })
            this.setState({ subject: '' })
            this.setState({ body: '' })
            this.setState({ createdBy: sessionStorage.getItem('_uid') })
            this.setState({ isSaved: true })
        })
    }


    render() {
        var forNam="Företag:";
        const customerList = this.state.customers.map( customerL => (
           <option key={customerL._id} value={customerL._id}>{customerL.firstname} {customerL.lastame} {forNam} {customerL.Name}</option>
        ))
        var textareaStyle={
            resize: 'none'
        }
        const { customer, subject, body, isSaved} = this.state
        if(isSaved == true) return <Redirect to='/CustomersList' /> 
        return (
               <div className="card text-center ">
                    <form className="my-4" onSubmit={this.onSubmit}>
                        <h5 className="card-header"><i className="fas fa-id-card mr-3"></i>Create issue</h5>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="customer">customer</label>
                                    <select className="form-control" id="customer" placeholder="Förnamn" value={customer} onChange={this.onChange}>
                                        <option value="">choose type</option>
                                        {customerList}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="subject">subject</label>
                                    <input type="text" className="form-control" id="subject" placeholder="subject" value={subject} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="body">description</label>
                                    <textarea className="form-control" id="body" placeholder="description" rows="10" cols="50" style={textareaStyle} value={body}  onChange={this.onChange}/>
                                </div>
                            </div>
                         </div>  
                            <div className="card-footer">
                            <button type="submit" className="btn btn-primary">create issue</button>
                            </div>
                        
                    </form>
                </div>
        )
    }
}

export default NewCaseForm