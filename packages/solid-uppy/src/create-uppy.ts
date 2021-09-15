import Uppy, { } from '@uppy/core';
import { createEffect, createSignal, onCleanup } from 'solid-js';

export default function createUppy(factory: () => Uppy): () => Uppy | undefined {
  const [instance, setInstance] = createSignal<Uppy>();

  createEffect(() => {
    const current = factory();

    setInstance(current);

    onCleanup(() => {
      current.close();
    });
  });

  return instance;
}
