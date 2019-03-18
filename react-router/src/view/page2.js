/**
    name: Lyd
    data: 2019-03-18:10:11:47
    describe: 
**/
import React, { Component } from 'react'
import { Link } from '../react-router-dom';
export default class page2 extends Component {
    render() {
        //console.log
        return (
            <div>
                <Link to="/1">222</Link>
                <div className="page2">我是page2</div>
            </div>

        )
    }
}