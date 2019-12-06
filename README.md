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

#### `reduxSample/types.js`

```javascript
export default {
  SET_DATA: "SET_DATA",
  ...
}
```

#### `reduxSample/actions.js`

```javascript
import types from "./types";

export default useActions = (state, dispatch) => {
  const actions = {};

  // declare actions what you want to do
  actions.fetchSomething = async (param1, param2) => {
    try {
      const res = await fetch("https://...");
      const resJson = await res.json();
      return dispatch({
        type: types.SET_DATA,
        data: resJson
      });
    } catch (e) {
      console.error(e);
    }
  };

  return actions;
};
```

#### `reduxSample/reducer.js`

```javascript
import types from "./types";

// the state at the beginning
const initialState = {
  data: []
};

// add codes here for changing state
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DATA: {
      const { data } = action;
      return {
        ...state,
        data
      };
    }

    default:
      throw new Error("Unexpected action");
  }
};

export { initialState, reducer };
```

#### `reduxSample/index.js`

```javascript
import RBC from "redux-by-context";

import { initialState, reducer } from "./reducer";
import useActions from "./actions";

const {
  Context: SampleContext,
  Provider: SampleProvider,
  useConsumer: SampleConsumer
} = RBC({
  contextName: "ctxSample", // You can change the name of context
  actionCreator: useActions,
  reducer,
  initialState,
  traceState: false
});

export { SampleContext, SampleProvider, SampleConsumer };
```

### 2. Let's use your redux codes

#### `App.js`

```javascript
import { SampleProvider } from './reduxSample'
import Child from "./child"

export default class App extends React.Component {
    ...

    render() {
        return (
            <>
                <SampleProvider>
                    <!-- Your child components here !-->
                    <Child />
                </SampleProvider>
            </>
        )
    }
}
```

#### `Child.js`

```javascript
import { SampleConsumer } from "./reduxSample";

class Child extends React.Component {
    ...

    async componentDidMount() {
        await this.props.ctxSample.actions.fetchSomething('abc', 'def')
        ...
    }

    render() {
        const {
            data
        } = this.props.ctxSample.state

        ...
    }
}

const ConsumedClass = SampleConsumer(Child)
export default ConsumedClass;
```
