"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function initialize(param) {
    const Context = react_1.createContext(param.initialState);
    const Provider = (renderParam) => {
        const [state, dispatch] = react_1.useReducer(param.reducer, param.initialState);
        const actions = param.actionCreator(state, dispatch);
        if (param.traceState) {
            react_1.useEffect(() => console.log({ newState: state }), [state]);
        }
        return (react_1.default.createElement(Context.Provider, { value: { state, dispatch, actions } }, renderParam.children));
    };
    const Consumer = Context.Consumer;
    const useConsumer = (ConsumableComponent) => (props) => (react_1.default.createElement(Consumer, null, ({ state, dispatch, actions }) => (react_1.default.createElement(ConsumableComponent, Object.assign({}, { [param.contextName]: { state, dispatch, actions } }, props)))));
    return {
        Context,
        Provider,
        Consumer,
        useConsumer
    };
}
exports.default = initialize;
