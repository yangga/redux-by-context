import React, { createContext, useContext, useEffect, useReducer } from "react";
export default function initialize(param) {
    const temp = null;
    const Context = createContext(temp);
    const Provider = (renderParam) => {
        const [state, dispatch] = useReducer(param.reducer, param.initialState);
        const actions = param.actionCreator(state, dispatch);
        if (param.traceState) {
            useEffect(() => console.log({ newState: state }), [state]);
        }
        return (React.createElement(Context.Provider, { value: [state, actions] }, renderParam.children));
    };
    function useRedux() {
        const [state, actions] = useContext(Context);
        return [state, actions];
    }
    return {
        Provider,
        useRedux
    };
}
