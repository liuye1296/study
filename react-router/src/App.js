import React from 'react';
import { Route, HashRouter } from './react-router-dom';
import page1 from './view/page1'
import page2 from './view/page2'
import page3 from './view/page3'
import './css/style.css'
const Router = () => (
    <HashRouter>
        <div>
            <Route path='/1' exact={true} component={page1}></Route>
            <Route path='/2' component={page2}></Route>
            <Route path='/3' component={page3}></Route>
        </div>
    </HashRouter>
)
export default Router