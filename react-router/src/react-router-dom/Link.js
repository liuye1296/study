/**
    name: Lyd
    data: 2019-03-18:13:39:36
    describe:  跳转组件
**/
import React, { Component } from 'react';
import { Consumer } from './context'
export default class link extends Component {
    render() {
        return (
            <Consumer>
                {(state) => {
                    let path = this.props.to;
                    if (state.mode !== 'history') {
                        path = '#' + path
                    }
                    return <a onClick={(e) => { state.history.push(this.props.to, this.props.state || undefined); e.preventDefault(); }} href={path}>{this.props.children}</a>

                }}
            </Consumer>

        )
    }

}