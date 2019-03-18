import React from 'react';
import { Route, BrowserRouter, Redirect, Switch } from './react-router-dom';
import page1 from './view/page1'
import page2 from './view/page2'
import page3 from './view/page3'
import './css/style.css'
const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/1' exact={true} component={page1}></Route>
            <Route path='/2' component={page2}></Route>
            <Route path='/2/:id' component={page2}></Route>
            <Route path='/3' component={page3}></Route>
            <Redirect to='/6'></Redirect>
        </Switch>
    </BrowserRouter>
)
export default Router