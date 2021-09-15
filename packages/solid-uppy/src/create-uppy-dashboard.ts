import Uppy from '@uppy/core';
import Dashboard, { DashboardOptions } from '@uppy/dashboard';
import {
  createEffect,
  onCleanup,
} from 'solid-js';

export default function createUppyDashboard(
  uppy: () => Uppy | undefined,
  options: DashboardOptions = {},
): void {
  createEffect(() => {
    const instance = uppy();
    if (instance) {
      const fullOptions = {
        id: 'solid:Dashboard',
        inline: true,
        ...options,
      };
      instance.use(Dashboard, fullOptions);

      const plugin = instance.getPlugin(fullOptions.id);

      if (plugin) {
        onCleanup(() => {
          instance.removePlugin(plugin);
        });
      }
    }
  });
}
