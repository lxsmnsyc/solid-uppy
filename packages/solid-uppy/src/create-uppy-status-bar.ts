import Uppy from '@uppy/core';
import StatusBar, { StatusBarOptions } from '@uppy/status-bar';
import { createEffect, onCleanup } from 'solid-js';

export default function createUppyStatusBar(
  uppy: () => Uppy | undefined,
  options: StatusBarOptions = {},
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      const fullOptions = {
        id: 'solid:StatusBar',
        ...options,
      };
      instance.use(StatusBar, fullOptions);

      const plugin = instance.getPlugin(fullOptions.id);

      if (plugin) {
        onCleanup(() => {
          instance.removePlugin(plugin);
        });
      }
    }
  });
}
