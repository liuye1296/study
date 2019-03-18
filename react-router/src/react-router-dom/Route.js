/**
    name: Lyd
    data: 2019-03-18:10:39:02
    describe: 
**/
import React, { Component } from 'react'
import { Consumer } from './context'
// 路径转正则表达式的插件 https://github.com/pillarjs/path-to-regexp#readme
import pathToRegexp from 'path-to-regexp'
export default class Route extends Component {
    render() {
        //console.log(pathToRegexp(this.props.path, [], { end: false }))
        return (
            <Consumer>
                {(state) => {
                    const { path, component: Component, exact = false } = this.props;
                    const pathname = state.location.pathname || ''
                    // extract = true  严格匹配  
                    let keys = []
                    const reg = pathToRegexp(path, keys, { end: exact })
                    keys = keys.map(res => res.name)
                    let data = pathname.match(reg);
                    const [url, ...datas] = data || [];
                    if (reg.test(pathname)) {
                        const props = {
                            location: state.location,
                            history: state.history,
                            macth: {
                                params: keys.reduce((obj, current, index) => {
                                    obj[current] = datas[index];
                                    return obj
                                }, {})
                            }
                        }
                        return <Component {...props}></Component>
                    }
                    return null
                }}
            </Consumer>
        )
    }
}