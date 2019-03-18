/**
    name: Lyd
    data: 2019-03-18:14:28:49
    describe: 这个路由包涵的组件  只渲染匹配到的第一子组件
**/
import React, { Component } from 'react'
import { Consumer } from './context'
import pathToRegexp from 'path-to-regexp'
export default class Switch extends Component {
    render() {
        return (
            <Consumer>
                {
                    state => {
                        const pathname = state.location.pathname
                        // this.props.children 当子组件不存在的时候 是ubdefined 当只有一个的时候 是个对象 而不是 array
                        if (this.props.children) {
                            if (Object.prototype.toString.call(this.props.children) === '[object Array]') {
                                for (let i = 0; i < this.props.children.length; i++) {
                                    const children = this.props.children[i]
                                    //if (React.isValidElement(children)) {
                                        // 不是所有組件都有 path Redirect 就沒有
                                        const { path = '', exact = false } = children.props;
                                        if (pathToRegexp(path, [], { end: exact }).test(pathname)) {
                                            return children
                                        }
                                    // } else {
                                    //     console.warn(`${children}不是一个组件`)
                                    // }
                                }
                            } else {
                                const { path = '', exact = false } = this.props.children.props;
                                if (pathToRegexp(path, [], { end: exact }).test(pathname)) {
                                    return this.props.children
                                }
                            }
                        }
                        return null
                    }
                }
            </Consumer>

        )
    }
}