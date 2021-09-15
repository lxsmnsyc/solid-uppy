import Uppy, { PluginOptions } from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import { createEffect, onCleanup } from 'solid-js';

interface DropTargetOptions extends PluginOptions {
  target: string | Element
}

export default function createUppyDropTarget(
  uppy: () => Uppy | undefined,
  options: DropTargetOptions,
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      const fullOptions = {
        id: 'solid:DropTarget',
        ...options,
      };
      instance.use(DropTarget, fullOptions);

      const plugin = instance.getPlugin(fullOptions.id);

      if (plugin) {
        onCleanup(() => {
          instance.removePlugin(plugin);
        });
      }
    }
  });
}
