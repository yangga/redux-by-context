import React from "react";
export declare type R = React.Reducer<any, any>;
export declare type State = React.ReducerState<R>;
export declare type Dispatch = React.Dispatch<React.ReducerAction<R>>;
export interface IInitialization {
    contextName: string;
    actionCreator: (state: React.ReducerState<R>, dispatch: React.Dispatch<React.ReducerAction<R>>) => any;
    initialState: React.ReducerState<R>;
    reducer: R;
    traceState?: boolean;
}
interface IParamProvide {
    children: any;
}
declare function initialize(param: IInitialization): {
    Context: React.Context<any>;
    Provider: (renderParam: IParamProvide) => JSX.Element;
    Consumer: React.Consumer<any>;
    useConsumer: (ConsumableComponent: React.ComponentType<{}>) => (props: any) => JSX.Element;
};
export default initialize;
