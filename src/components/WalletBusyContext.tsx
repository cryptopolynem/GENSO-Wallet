import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface WalletBusyContextValue {
  isBusy: boolean;
  setBusy: (busy: boolean) => void;
}

const WalletBusyContext = createContext<WalletBusyContextValue | null>(null);

export function WalletBusyProvider({ children }: { children: ReactNode }) {
  const [isBusy, setBusy] = useState(false);
  return (
    <WalletBusyContext.Provider value={{ isBusy, setBusy }}>
      {children}
    </WalletBusyContext.Provider>
  );
}

export function useWalletBusy(): WalletBusyContextValue {
  const ctx = useContext(WalletBusyContext);
  if (!ctx) {
    throw new Error("useWalletBusy must be used within a WalletBusyProvider");
  }
  return ctx;
}
