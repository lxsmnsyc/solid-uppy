import Uppy from '@uppy/core';
import ProgressBar, { ProgressBarOptions } from '@uppy/progress-bar';
import { createEffect, onCleanup } from 'solid-js';

export default function createUppyProgressBar(
  uppy: () => Uppy | undefined,
  options: ProgressBarOptions = {},
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      const fullOptions = {
        id: 'solid:ProgressBar',
        ...options,
      };
      instance.use(ProgressBar, fullOptions);

      const plugin = instance.getPlugin(fullOptions.id);

      if (plugin) {
        onCleanup(() => {
          instance.removePlugin(plugin);
        });
      }
    }
  });
}
