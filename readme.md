## 总结

- Redux
- - Store: createStore(reducer)
- - State
- - Action: 修改state
- - Dispatch： 触发action
```
    store.dispatch(action)
    action = {
        type: "ADD_COUNTER",
        payload: 0
    }
    store 会自动触发reducer ，传入两个参数，一个 state， 一个action， 返回一个新的state
    newstate = reducer1(state, action);
    newstate !== state 
        store.subscribe(listener)
    else 
        不触更新
```

### createStore 的简单实现

```
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return{ getState, dispatch, subscribe }
};
```


### combineReducers 的简单实现

```
    const combineReducers = reducers => {
        return (state = {}, action) => {
            return Object.keys(reducers).reduce(
                (nextState, key) => {
                    nextState[key] = reducers[key](state[key], action);
                    return nextState;
                },
                {} 
            );
        };
    };

```
