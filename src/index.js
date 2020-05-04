import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";

import Counter from "./components/counter";
import ImageChanger from "./components/changeImg";
// import counter from "./redux/reducer";
// import imageChanger from "./redux/changeImg";
import reducer from './reducers/index';

const store = createStore(reducer);
// const store = createStore(reducer);
// const store2 = createStore(imageChanger);
const rootEl = document.getElementById('root');

console.log(store.getState())
const render = () => ReactDOM.render(
    <div>
        <Counter 
            value={store.getState().value}
            onIncrement={()=>{
                store.dispatch({
                    type: "INCREMENT"
                })
            }}
            onDecrement={()=>{
                store.dispatch({
                    type: "DECREMENT"
                })
            }}
        />
        <div>
            <ImageChanger 
                changeImg={store.getState().src} 
                useNew={() => {
                    store.dispatch({
                        type: "OLD"
                    }) 
                }}

                useOld={() => {
                    store.dispatch({
                        type: "NEW"
                    })
                }}
            /> 
        </div>
    </div>,
    rootEl
)

render();

store.subscribe(render); // 订阅或者监听这个方法，当state的值发生变化触发render方法
// store2.subscribe(render); // 订阅或者监听这个方法，当state的值发生变化触发render方法