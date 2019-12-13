import React, { createContext, useEffect, useReducer } from "react";

export type R = React.Reducer<any, any>;
export type State = React.ReducerState<R>;
export type Dispatch = React.Dispatch<React.ReducerAction<R>>;

export interface IInitialization {
  contextName: string;
  actionCreator: (
    state: React.ReducerState<R>,
    dispatch: React.Dispatch<React.ReducerAction<R>>
  ) => any;
  initialState: React.ReducerState<R>;
  reducer: R;
  traceState?: boolean;
}

interface IParamProvide {
  children: any;
}

function initialize(param: IInitialization) {
  const Context = createContext(param.initialState);

  const Provider = (renderParam: IParamProvide) => {
    const [state, dispatch] = useReducer(param.reducer, param.initialState);

    const actions = param.actionCreator(state, dispatch);

    if (param.traceState) {
      useEffect(() => console.log({ newState: state }), [state]);
    }

    return (
      <Context.Provider value={{ state, dispatch, actions }}>
        {renderParam.children}
      </Context.Provider>
    );
  };

  const Consumer = Context.Consumer;
  const useConsumer = (ConsumableComponent: React.ComponentType) => (
    props: any
  ) => (
    <Consumer>
      {({ state, dispatch, actions }) => (
        <ConsumableComponent
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
