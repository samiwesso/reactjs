import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { get,  logout } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

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
        logout: () => dispatch(logout())
    }
}
class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            isEditing: false
        }
    }
    componentDidMount() {
        this.setState({ user: JSON.parse(sessionStorage.getItem('user')) })
     }
    logout = e => {
        this.props.logout(this.state.user._id, sessionStorage.getItem('jwt'))
        this.setState({ loggedIn: false })
    }
    render() {
        console.log(sessionStorage.getItem('jwt'))
        if(sessionStorage.getItem('jwt') === null) {
             return( <Redirect to="/login" /> )
        }
        //
        console.log(sessionStorage.getItem('user'))
        return(
            <div>
            <Header user={JSON.parse(sessionStorage.getItem('user'))} logout={this.logout}/>
            <div className="container mt-5">
                <h1>This is our home side</h1>
            </div>   
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
