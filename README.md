# redux-by-context

## Installation

```bash
yarn add redux-by-context
```

## Before to use this module

You should understand what 'redux' is...

## Usage

### 1. Writing redux codes

```tree
-- reduxSample - types.js
               - actions.js
               - reducer.js
               - index.js
```

#### `reduxSample/types.ts`

```javascript
export const SET_DATA = "SET_DATA";
...
```

#### `reduxSample/reducer.ts`

```javascript
import { DefaultReducerAction } from "redux-by-context";
import * as types from "./types";

export class State {
  list: Array<number> = [];
}

// the state at the beginning
const initialState = new State();

// add codes here for changing state
const reducer = (prevState = initialState, action: DefaultReducerAction) => {
  switch (action.type) {
    case types.SET_DATA:
      const {
        data: { list }
      } = action;

      return {
        ...prevState,
        list
      };
    default:
      throw new Error("Unexpected action");
  }
};

export { initialState, reducer };
```

#### `reduxSample/actions.ts`

```javascript
import { DefaultDispatch } from "redux-by-context";
import { State } from "./reducer";
import * as types from "./types";

export interface Actions {
  fetch: (param: any) => Promise<any>;
}

export function actionCreator(state: State, dispatch: DefaultDispatch) {
  class ActionImpl implements Actions {
    async fetch(param?: any) {
      try {
        // do something...

        return dispatch({
          type: types.SET_DATA,
          data: {
            list: [1, 2, 3, 4, 5]
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
  const ins = new ActionImpl();
  return ins;
}
```

#### `reduxSample/index.ts`

```javascript
import reduxInitialize from "redux-by-context";

import { actionCreator } from "./actions";
import { initialState, reducer } from "./reducer";

export const { Provider, useRedux } = reduxInitialize({
  actionCreator: actionCreator,
  reducer,
  initialState,
  traceState: false
});
```

### 2. Let's use your redux codes

#### `App.tsx`

```javascript
import { Provider } from "./reduxSample";
import Child from "./child";

export default function App() {
  return (
    <>
      <Provider>
        <Child />
      </Provider>
    </>
  );
}
```

#### `Child.tsx`

```javascript
import { useRedux } from "./reduxSample";

export default (props: any) => {
  const [flowState, flowAction] = useRedux();

  console.log("flowState", flowState);

  useEffect(() => {
    flowAction.fetch().then(() => {});
  }, []);

  return (
    ...
  )
}
```
