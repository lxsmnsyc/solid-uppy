import type Uppy from '@uppy/core';
import type { BasePlugin, Body, Meta, UppyEventMap } from '@uppy/core';
import { createEffect, createSignal, onCleanup } from 'solid-js';

export function createUppy(factory: () => Uppy): () => Uppy | undefined {
  const [instance, setInstance] = createSignal<Uppy>();

  createEffect(() => {
    const current = factory();

    setInstance(current);

    onCleanup(() => {
      current.destroy();
    });
  });

  return instance;
}

type OmitFirstArg<T> = T extends [any, ...infer U] ? U : never;

export function useUppyPlugin<
  M extends Meta,
  B extends Body,
  T extends typeof BasePlugin<any, M, B>,
>(
  uppy: () => Uppy<M, B> | undefined,
  id: string,
  plugin: T,
  ...args: OmitFirstArg<ConstructorParameters<T>>
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      instance.use(plugin, ...args);

      const pluginInstance = instance.getPlugin(id);

      if (pluginInstance) {
        onCleanup(() => {
          instance.removePlugin(pluginInstance);
        });
      }
    }
  });
}

export function useUppyEvent<
  M extends Meta,
  B extends Body,
  K extends keyof UppyEventMap<M, B>,
>(
  uppy: () => Uppy<M, B> | undefined,
  event: K,
  callback: UppyEventMap<M, B>[K],
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      instance.on(event, callback);
      onCleanup(() => {
        instance.off(event, callback);
      });
    }
  });
}
