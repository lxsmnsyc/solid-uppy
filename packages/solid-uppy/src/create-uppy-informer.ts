import Uppy, { PluginOptions, PluginTarget } from '@uppy/core';
import Informer from '@uppy/informer';
import { createEffect, onCleanup } from 'solid-js';

interface InformerOptions extends PluginOptions {
  target?: PluginTarget
}

export default function createUppyStatusBar(
  uppy: () => Uppy | undefined,
  options: InformerOptions = {},
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      const fullOptions = {
        id: 'solid:Informer',
        ...options,
      };
      instance.use(Informer, fullOptions);

      const plugin = instance.getPlugin(fullOptions.id);

      if (plugin) {
        onCleanup(() => {
          instance.removePlugin(plugin);
        });
      }
    }
  });
}
