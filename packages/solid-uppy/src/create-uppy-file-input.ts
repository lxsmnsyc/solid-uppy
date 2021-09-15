import Uppy from '@uppy/core';
import FileInput, { FileInputOptions } from '@uppy/file-input';
import { createEffect, onCleanup } from 'solid-js';

export default function createUppyFileInput(
  uppy: () => Uppy | undefined,
  options: FileInputOptions,
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      const fullOptions = {
        id: 'solid:FileInput',
        ...options,
      };
      instance.use(FileInput, fullOptions);

      const plugin = instance.getPlugin(fullOptions.id);

      if (plugin) {
        onCleanup(() => {
          instance.removePlugin(plugin);
        });
      }
    }
  });
}
