/**
    name: Lyd
    data: 2019-03-18:17:35:51
    describe: 
**/
import React, { Component } from 'react'
import { Provider } from './context'
export default class BrowserRouter extends Component {
    constructor() {
        super()
        this.state = {
            location: {
                hash: '',
                params: {},
                pathname: window.location.pathname || '/',
                state: undefined,
            }
        }
    }
    componentDidMount() {
        window.addEventListener('popstate', e => {
            //console.log(e)
            this.setState({
                location: {
                    ...this.state.location,
                    pathname: window.location.pathname || '/',
                }
            })
        })

    }
    render() {
        const value = {
            location: this.state.location,
            mode: 'history',
            history: {
                location: this.state.location,
                push: (path, state) => {
                    if (path) {
                        //console.log(window.history.pushState)
                        window.history.pushState({}, null, path)
                        this.setState({
                            location: {
                                ...this.state.location,
                                pathname: window.location.pathname || '/',
                            }
                        })
                    } else {
                        console.warn('path is undefined')
                    }
                },
                go: (n) => { window.history.go(n) },
                goBack: () => { window.history.back() },
                goForward: () => { window.history.forward() },
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