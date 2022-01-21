import React, { createContext, useContext } from "react";

import { ffmpegStore } from "../ffmpeg";

export interface RootStoreContextValue {
  ffmpegStore: typeof ffmpegStore;
}

export interface WithRootStoreProps {
  store: RootStoreContextValue;
}

export const rootStore: RootStoreContextValue = {
  ffmpegStore,
};

export const RootStoreContext = createContext<RootStoreContextValue>({} as RootStoreContextValue);

export const useRootStore = () => useContext<RootStoreContextValue>(RootStoreContext);

export const RootStoreProvider: React.FC<React.PropsWithChildren<WithRootStoreProps>> = ({
  store,
  children,
}) => {
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};

export function withRootStore<T extends WithRootStoreProps = WithRootStoreProps>(
  WrappedComponent: React.ComponentType<T>,
) {
  const WithRootStore = (props: Omit<T, keyof WithRootStoreProps>) => (
    <WrappedComponent {...(props as T)} store={useRootStore()} />
  );

  WithRootStore.displayName = `WithRootStore(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithRootStore;
}
