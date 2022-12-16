import { createContext, ReactNode, useContext } from "react";
import RootStore from "./RootStore";
import React from "react";


export default function StoreLCycler() {
  let store: typeof RootStore;

  // create the context
  const StoreContext = createContext<typeof RootStore | undefined>(undefined);

  // create the provider component
  function RootStoreProvider({ children }: { children: ReactNode }) {
    //only create the store once ( store is a singleton)
    const root = store ?? RootStore;

    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
  }

  // create the hook
  function useRootStore() {
    const context = useContext(StoreContext)
    if (context === undefined) {
      throw new Error("useRootStore must be used within RootStoreProvider")
    }
    return context

  }
}