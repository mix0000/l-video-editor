import React, { createContext, useContext } from "react";
import { fileStore, outputStore } from "AppDir/store/fileStore";
import { ffmpegStore } from "./store/ffmpegStore";
import { mediaInfoStore } from "./store/mediaInfoStore";

export interface RootStoreContextValue {
  ffmpegStore: typeof ffmpegStore;
  mediaInfoStore: typeof mediaInfoStore;
  fileStore: typeof fileStore;
  outputStore: typeof outputStore;
}

export interface WithRootStoreProps {
  store: RootStoreContextValue;
}

export const rootStore: RootStoreContextValue = {
  ffmpegStore,
  mediaInfoStore,
  fileStore,
  outputStore,
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
