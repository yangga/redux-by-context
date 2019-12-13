import React, { createContext, useContext, useEffect, useReducer } from "react";

interface ReducerAction<ActionTypes> {
  type: ActionTypes;
  data: any;
}
export type DefaultReducerAction = ReducerAction<string>;

type Reducer<State, ActionTypes> = (
  prevState: State,
  action: ReducerAction<ActionTypes>
) => State;

export type Dispatch<ActionTypes> = React.Dispatch<ReducerAction<ActionTypes>>;
export type DefaultDispatch = Dispatch<string>;

type ActionCreator<State, ActionTypes, ActionPool> = (
  state: State,
  dispatch: Dispatch<ActionTypes>
) => ActionPool;

interface InitParam<State, ActionPool, ActionTypes> {
  actionCreator: ActionCreator<State, ActionTypes, ActionPool>;
  initialState: State;
  reducer: Reducer<State, ActionTypes>;
  traceState?: boolean;
}

interface ParamProvide {
  children: React.ReactNode;
}

export default function initialize<State, ActionPool, ActionTypes = string>(
  param: InitParam<State, ActionPool, ActionTypes>
) {
  const temp: any = null;
  const Context = createContext(temp);

  const Provider = (renderParam: ParamProvide) => {
    const [state, dispatch] = useReducer(param.reducer, param.initialState);

    const actions = param.actionCreator(state, dispatch);

    if (param.traceState) {
      useEffect(() => console.log({ newState: state }), [state]);
    }

    return (
      <Context.Provider value={[state, actions]}>
        {renderParam.children}
      </Context.Provider>
    );
  };

  function useRedux(): [State, ActionPool] {
    const [state, actions] = useContext(Context);
    return [state, actions];
  }

  return {
    Provider,
    useRedux
  };
}
