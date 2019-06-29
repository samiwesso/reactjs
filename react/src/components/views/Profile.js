import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from './Header'

import { get, update, logout } from '../../store/actions/authActions'

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.profile.user,
        loggedIn: state.profile.loggedIn,
        authError: state.profile.authError,
        token: state.profile.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get: (_uid, jwt) => dispatch(get(_uid, jwt)),
        update: (user, jwt) => dispatch(update(user, jwt)),
        logout: () => dispatch(logout())
    }
}

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            isEditing: false
        }
    }

    componentDidMount() {
       this.props.get(sessionStorage.getItem('_uid'),sessionStorage.getItem('jwt'))
        this.setState({ user: JSON.parse(sessionStorage.getItem('user')) })
    }

    componentWillReceiveProps() {
        this.setState({ isEditing: false })
    }

    onChange = e => {
        const user = this.state.user
        user[e.target.id] = e.target.value
        return this.setState({ user: user })
    }

    saveEdit = e => {
        e.preventDefault()
        this.props.update(this.state.user, sessionStorage.getItem('jwt'))
        this.props.history.push('/profile')
    }   

    cancelEdit = e => {
        this.setState({ user: JSON.parse(sessionStorage.getItem('user')) })
        this.props.history.push('/profile')
    }

    logout = e => {
        this.props.logout(this.state.user._id, sessionStorage.getItem('jwt'))
        this.setState({ loggedIn: false })
    }   

    render() {

        if(sessionStorage.getItem('jwt') === null) {
            return( <Redirect to="/login" /> )
        }
        console.log(this.props.user)
        return(
            <div>
            <Header user={JSON.parse(sessionStorage.getItem('user'))} logout={this.logout}/>
            <div className="container mt-5">
            <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" className="form-control" 
                            id="firstname" value={this.state.user.firstname} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" className="form-control" id="lastname" value={this.state.user.lastname} onChange={this.onChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="email">E-postaddress</label>
                            <input type="email" className="form-control" id="email" value={this.state.user.email} onChange={this.onChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="addressline">Address</label>
                            <input type="text" className="form-control" id="addressline" value={this.state.user.addressline} onChange={this.onChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="zipcode">Post number</label>
                            <input type="text" className="form-control" id="zipcode" value={this.state.user.zipcode} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" value={this.state.user.city} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" id="country" value={this.state.user.country} onChange={this.onChange} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary px-2" onClick={this.saveEdit}>Save</button>
                    <button type="reset" className="btn btn-danger ml-3 px-2" onClick={this.cancelEdit}>Cancel</button>

                    </form>
            </div>
            </div>       
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)