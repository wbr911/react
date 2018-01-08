/**
 * Created by bolan on 2017/8/22.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendar';
import './index.css';

var now = new Date();
ReactDOM.render(
    <div id="root">
        <Calendar year={now.getFullYear()} month={now.getMonth()+1} date={now.getDate()}/>
    </div>,
    document.getElementById('root')
);