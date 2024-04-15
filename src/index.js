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
  const myDarwiniaRpcUrls = [
    "https://cors.kahub.in/http://38.242.135.236:6644"
  ]

  const myCrabRpcUrls = [
    "https://cors.kahub.in/http://38.242.135.236:9944",
  ]

  return (
    <div class="antialiased bg-gray-100 text-gray-600 flex flex-col justify-center">
      <UrlsTestPanel title="DARWINIA" rpcUrls={darwiniaRpcUrls} concurrency="20" />
      <UrlsTestPanel title="CRAB" rpcUrls={crabRpcUrls} concurrency="20" />
      <UrlsTestPanel title="MY DARWINIA RPCS" rpcUrls={myDarwiniaRpcUrls} concurrency="5" />
      <UrlsTestPanel title="MY CRAB RPCS" rpcUrls={myCrabRpcUrls} concurrency="5" />
      <UrlsTestPanel title="PANGOLIN" rpcUrls={pangolinRpcUrls} concurrency="10" />
      <UrlsTestPanel title="MOONBEAM" rpcUrls={moonbeamRpcUrls} concurrency="20" />
      <div class="text-center py-4 pb-6 text-gray-500 text-xs">
        by Aki Wu, <a href="https://github.com/wuminzhe/rpcs-test" class="text-blue-500">Github</a>
      </div>
    </div>
  );
};

if (typeof window !== "undefined") {
  // set title
  document.title = "RPCs Test";
  render(<App />, document.body);
}
