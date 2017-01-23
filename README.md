
## React Pos
HoC for detecting changes of an element and return the new dimensions

Install the package from [npm](https://npmjs.com/release)

```bash
npm install --save react-pos
```

## Usage

### Basic Example

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import extract from 'react-pos';

const InnerContainer = reactPos()(({container}) => {
    const { bottom, height, left, right, top, width } = container;
    const stringContainer = JSON.stringify({
      bottom, height, left, right, top, width,
    }, null, 2);
    return (
      <div>{ stringContainer }</div>
    );
});


class App extends Component {

    render() {
        return (
            <InnerContainer />
        )
    }
}

render(<App/>, document.getElementById('app'));

```

## License

[MIT](LICENSE). Copyright (c) 2016 Philip Knape.
