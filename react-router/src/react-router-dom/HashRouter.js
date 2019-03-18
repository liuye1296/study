/**
    name: Lyd
    data: 2019-03-18:10:38:34
    describe:  HashRouter
**/
import React, { Component } from 'react'
import { Provider } from './context'
export default class HashRouter extends Component {
    /* history:
    action: "POP"
    block: ƒ block(prompt)
    createHref: ƒ createHref(location)
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    length: 2
    listen: ƒ listen(listener)
    location: {pathname: "/1", search: "", hash: "", state: undefined}
    push: ƒ push(path, state)
    replace: ƒ replace(path, state) 
    
    location:
    hash: ""
    pathname: "/1"
    search: ""
    state: undefined
    
    
    match:
    isExact: true
    params: {}
    path: "/1"
    url: "/1"
    
    staticContext
    */
    constructor() {
        super();
        this.state = {
            location: {
                hash: '',
                params: {},
                pathname: window.location.hash.slice(1) || '/',
                state: undefined,
            }
        }
    }
    componentDidMount() {
        // 加载完成自动添加hash
        window.location.hash = window.location.hash || '/';
        // debugger
        // 监听hash变动
        window.addEventListener('hashchange', () => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname: window.location.hash.slice(1) || '/'
                }
            })
        })
    }
    render() {
        const value = {
            location: this.state.location,
            history: {
                location: this.state.location,
                push: (path, state) => {
                    if (path) {
                        window.location.hash = path
                    } else {
                        console.warn('path is undefined')
                    }
                },
                go: (n) => { window.history.go(n) },
                goBack: () => { window.history.back() },
                goForward: goForward => { window.history.forward()},
                length: 2,
            }
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}