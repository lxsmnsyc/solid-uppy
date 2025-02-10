# solid-uppy

> SolidJS bindings for [Uppy](https://uppy.io/)

[![NPM](https://img.shields.io/npm/v/solid-uppy.svg)](https://www.npmjs.com/package/solid-uppy) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/LXSMNSYC/solid-uppy/tree/main/examples/solid-uppy-demo)

## Install

```bash
yarn add @uppy/core solid-uppy
```

## Usage

```js
import Uppy from '@uppy/core';
import { createUppy, useUppyPlugin, useUppyEvent } from 'solid-uppy';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';

function Example(props) {
  // Create an instance
  const instance = createUppy(() => new Uppy());

  // Use some plugins
  useUppyPlugin(instance, 'Dashboard', Dashboard, {
    inline: true,
    get target() {
      return props.element;
    },
  });
  useUppyPlugin(instance, 'ImageEditor', ImageEditor);

  // Listen to events
  useUppyEvent(instance, 'file-editor:start', (file) => {
    console.log(file);
  }); 
}
```

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
