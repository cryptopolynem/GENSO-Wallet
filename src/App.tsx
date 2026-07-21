import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ToastProvider } from "./components/ToastContext";
import { WalletBusyProvider } from "./components/WalletBusyContext";
import { Home } from "./pages/Home";
import { MultisigCreate } from "./pages/MultisigCreate";
import { MultisigDetail } from "./pages/MultisigDetail";
import { ProposalCreate } from "./pages/ProposalCreate";
import { ProposalDetail } from "./pages/ProposalDetail";
import { AllProposals } from "./pages/AllProposals";

function App() {
  return (
    <ToastProvider>
      <WalletBusyProvider>
        <div className="app-shell">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/multisig/create" element={<MultisigCreate />} />
              <Route path="/multisig/proposals" element={<AllProposals />} />
              <Route path="/multisig/:address" element={<MultisigDetail />} />
              <Route path="/multisig/:address/propose" element={<ProposalCreate />} />
              <Route path="/multisig/:address/proposal/:id" element={<ProposalDetail />} />
            </Routes>
          </main>
        </div>
      </WalletBusyProvider>
    </ToastProvider>
  );
}

export default App;
