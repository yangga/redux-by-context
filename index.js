import React, { createContext, useEffect, useReducer } from 'react'

function initialize({
    contextName = 'context',
    actionCreator,
    reducer,
    initialState,
    traceState = false,
}) {
    const Context = createContext(initialState);

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const actions = actionCreator(state, dispatch);

        if (traceState) {
            useEffect(() => console.log({ newState: state }), [state]);
        }

        return (
            <Context.Provider value={{ state, dispatch, actions }}>
                {children}
            </Context.Provider>
        )
    };

    const Consumer = Context.Consumer;
    const useConsumer = (WrappedComponent) =>
        (props) => (
            <Consumer>
                {
                    ({ state, dispatch, actions }) => (<WrappedComponent {...{ [contextName]: { state, dispatch, actions } }} {...props} />)
                }
            </Consumer>
        );

    return {
        Context,
        Provider,
        Consumer,
        useConsumer,
    }
}

export default initialize;
