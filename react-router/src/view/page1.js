/**
    name: Lyd
    data: 2019-03-18:10:15:58
    describe: 
**/
import React, { Component } from 'react'
export default class page1 extends Component {
    constructor() {
        super();
        //16.3 api
        this.text = React.createRef();
    }
    submit = (e) => {
        this.props.history.push('/2')
        e.preventDefault()
    }
    render() {
        //console.log(this.props)
        return (
            <div>
                <div className='page1'>我是page1</div>
                <form onSubmit={this.submit}>
                    <input type='text' ref={this.text} />
                    <button type="submit">确定</button>
                </form>
            </div>

        )
    }
}