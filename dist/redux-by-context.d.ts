import React from "react";
interface ReducerAction<ActionTypes> {
    type: ActionTypes;
    data: any;
}
export declare type DefaultReducerAction = ReducerAction<string>;
declare type Reducer<State, ActionTypes> = (prevState: State, action: ReducerAction<ActionTypes>) => State;
export declare type Dispatch<ActionTypes> = React.Dispatch<ReducerAction<ActionTypes>>;
export declare type DefaultDispatch = Dispatch<string>;
declare type ActionCreator<State, ActionTypes, ActionPool> = (state: State, dispatch: Dispatch<ActionTypes>) => ActionPool;
interface InitParam<State, ActionPool, ActionTypes> {
    actionCreator: ActionCreator<State, ActionTypes, ActionPool>;
    initialState: State;
    reducer: Reducer<State, ActionTypes>;
    traceState?: boolean;
}
interface ParamProvide {
    children: React.ReactNode;
}
export default function initialize<State, ActionPool, ActionTypes = string>(param: InitParam<State, ActionPool, ActionTypes>): {
    Provider: (renderParam: ParamProvide) => JSX.Element;
    useRedux: () => [State, ActionPool];
};
export {};
