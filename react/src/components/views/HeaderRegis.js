import React, { Component } from 'react'
import NavigationRegis from './NavigationRegis'


class HeaderRegis extends Component {

    render() {
        console.log(this.props)
        return(
            <header>
                <NavigationRegis user={this.props.user} logout={ this.props.logout}/>
            </header>   
        )
    }

}

export default HeaderRegis