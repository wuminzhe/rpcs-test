import "normalize.css/normalize.css";
import "tailwindcss/dist/tailwind.min.css";
import { render } from "preact";

import { UrlsTestPanel } from "./urls_test_panel";

const App = () => {
  const darwiniaRpcUrls = [
    "https://rpc.darwinia.network",
    "https://darwinia-rpc.dwellir.com",
    "https://darwinia-rpc.darwiniacommunitydao.xyz",
  ];
  const crabRpcUrls = [
    "https://crab-rpc.darwinia.network",
    "https://crab-rpc.darwiniacommunitydao.xyz",
  ];
  const pangolinRpcUrls = [
    "https://pangolin-rpc.darwinia.network",
  ];
  const moonbeamRpcUrls = [
    "https://rpc.api.moonbeam.network",
    "https://moonbeam-rpc.publicnode.com"
  ];

  return (
    <div class="antialiased bg-gray-100 text-gray-600 flex flex-col justify-center h-screen">
      <UrlsTestPanel title="DARWINIA" rpcUrls={darwiniaRpcUrls} concurrency="20" />
      <UrlsTestPanel title="CRAB" rpcUrls={crabRpcUrls} concurrency="20" />
      <UrlsTestPanel title="PANGOLIN" rpcUrls={pangolinRpcUrls} concurrency="10" />
      <UrlsTestPanel title="MOONBEAM" rpcUrls={moonbeamRpcUrls} concurrency="20" />
    </div>
  );
};

if (typeof window !== "undefined") {
  render(<App />, document.body);
}
