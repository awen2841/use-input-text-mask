# useTextMask

## Installation

#### Yarn

```bash
yarn add use-input-text-mask
```

#### NPM

```bash
npm install use-input-text-mask
```

-----
[![npm](https://img.shields.io/npm/v/use-input-text-mask?style=flat)](https://www.npmjs.com/package/use-input-text-mask)
-----


Then, require it and use it.

```js
import React from 'react'
import { useInputTextMask } from 'use-input-text-mask';

export default () => {
  const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  const { ref: inputRef, onChange } = useInputTextMask({ mask });
  
  return (
    <div>
      <input ref={inputRef} type="tel" onChange={onChange} />
    </div>
  )
}
```

## Example

To see an example of the code running, follow these steps:

1. Clone the repo, `git clone https://github.com/awen2841/use-input-text-mask.git`
1. `cd use-input-text-mask/exemple`
1. `npm install`
1. `npm run storybook`
1. Open [http://localhost:6006](http://localhost:6006)

The code of the example is in [`exemple`](https://).
