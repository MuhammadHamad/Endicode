import { lazy, type ComponentType, type LazyExoticComponent } from "react";

type Module<T> = { default: T };

export type PreloadableComponent<T extends ComponentType<any>> = LazyExoticComponent<T> & {
  preload: () => Promise<Module<T>>;
};

// React.lazy suspends on a component's first render even when its chunk is
// already downloaded, because import() always hands back a pending promise —
// and while it is suspended the route renders nothing, so the footer jumps up
// under the navbar. Once preload() has finished, this gives React a thenable
// that resolves synchronously, so the route renders straight away instead.
export function lazyWithPreload<T extends ComponentType<any>>(
  load: () => Promise<Module<T>>,
): PreloadableComponent<T> {
  let loaded: Module<T> | undefined;
  let pending: Promise<Module<T>> | undefined;

  const preload = () => {
    pending ??= load().then((mod) => {
      loaded = mod;
      return mod;
    });
    return pending;
  };

  const Component = lazy(() => {
    if (loaded) {
      const mod = loaded;
      return { then: (resolve: (m: Module<T>) => void) => resolve(mod) } as unknown as Promise<Module<T>>;
    }
    return preload();
  });

  return Object.assign(Component, { preload });
}
