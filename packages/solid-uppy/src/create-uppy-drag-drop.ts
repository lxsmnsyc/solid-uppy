import Uppy from '@uppy/core';
import DragDrop, { DragDropOptions } from '@uppy/drag-drop';
import { createEffect, onCleanup } from 'solid-js';

export default function createUppyDragDrop(
  uppy: () => Uppy | undefined,
  options: DragDropOptions = {},
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      const fullOptions = {
        id: 'solid:DragDrop',
        ...options,
      };
      instance.use(DragDrop, fullOptions);

      const plugin = instance.getPlugin(fullOptions.id);

      if (plugin) {
        onCleanup(() => {
          instance.removePlugin(plugin);
        });
      }
    }
  });
}
