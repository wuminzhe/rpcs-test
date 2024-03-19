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
  return (
    <div class="antialiased bg-gray-100 text-gray-600 flex flex-col justify-center h-screen">
      <UrlsTestPanel title="DARWINIA" rpcUrls={darwiniaRpcUrls} concurrency="100" />
      <UrlsTestPanel title="CRAB" rpcUrls={crabRpcUrls} concurrency="100" />
    </div>
  );
};

if (typeof window !== "undefined") {
  render(<App />, document.body);
}
