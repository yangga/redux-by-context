import React, { createContext, useEffect, useReducer } from "react";

export type R = React.Reducer<any, any>;
export type State = React.ReducerState<R>;
export type Dispatch = React.Dispatch<React.ReducerAction<R>>;

export interface IInitialization {
  contextName: string;
  reducer: R;
  initialState: React.ReducerState<R>;
  traceState: boolean;
  actionCreator: (
    state: React.ReducerState<R>,
    dispatch: React.Dispatch<React.ReducerAction<R>>
  ) => any;
}

function initialize(param: IInitialization) {
  const Context = createContext(param.initialState);

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(param.reducer, param.initialState);

    const actions = param.actionCreator(state, dispatch);

    if (param.traceState) {
      useEffect(() => console.log({ newState: state }), [state]);
    }

    return (
      <Context.Provider value={{ state, dispatch, actions }}>
        {children}
      </Context.Provider>
    );
  };

  const Consumer = Context.Consumer;
  const useConsumer = (WrappedComponent: React.ComponentType) => (
    props: any
  ) => (
    <Consumer>
      {({ state, dispatch, actions }) => (
        <WrappedComponent
          {...{ [param.contextName]: { state, dispatch, actions } }}
          {...props}
        />
      )}
    </Consumer>
  );

  return {
    Context,
    Provider,
    Consumer,
    useConsumer
  };
}

export default initialize;
