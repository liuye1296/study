/**
    name: Lyd
    data: 2019-03-18:14:20:21
    describe:  重定向组件  <Redirect to='/'></Redirect>
**/
import React, { Component } from 'react';
import { Consumer } from './context';
export default class Redirect extends Component {
    render() {
        return (
            <Consumer>
                {
                    state => {
                        // 直接重定向
                        state.history.push(this.props.to);
                        return null;
                    }
                }
            </Consumer>
        )
    }
}