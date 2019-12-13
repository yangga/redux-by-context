"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function initialize(param) {
    const temp = null;
    const Context = react_1.createContext(temp);
    const Provider = (renderParam) => {
        const [state, dispatch] = react_1.useReducer(param.reducer, param.initialState);
        const actions = param.actionCreator(state, dispatch);
        if (param.traceState) {
            react_1.useEffect(() => console.log({ newState: state }), [state]);
        }
        return (react_1.default.createElement(Context.Provider, { value: [state, actions] }, renderParam.children));
    };
    function useRedux() {
        const [state, actions] = react_1.useContext(Context);
        return [state, actions];
    }
    return {
        Provider,
        useRedux
    };
}
exports.default = initialize;
