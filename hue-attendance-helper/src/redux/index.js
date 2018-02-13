/**
 * Created by bolan on 2018/1/15.
 */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import todoApp from './reducers/todoApp';
import App from'./components/App';

let store = createStore(todoApp);

var monitorStateListener = store.subscribe(()=>{
    console.log(store.getState());
});
render(
    <Provider store={store} >
        <App/>
    </Provider> , document.getElementById('root')
);