/**
 * Created by bolan on 2017/8/22.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var now = new Date();
window.reactRoot = ReactDOM.render(
    <MuiThemeProvider>
            <Calendar year={now.getFullYear()} month={now.getMonth() + 1} date={now.getDate()}/>
    </MuiThemeProvider>,
    document.getElementById('root')
);

window.FindReact = function(dom) {
    for (var key in dom) {
        if (key.startsWith("__reactInternalInstance$")) {
            var compInternals = dom[key]._currentElement;
            var compWrapper = compInternals._owner;
            var comp = compWrapper._instance;
            return comp;
        }
    }
    return null;
};