import "normalize.css/normalize.css";
import "tailwindcss/dist/tailwind.min.css";
import { render } from "preact";

import { UrlsTestPanel } from "./urls_test_panel";

// async function fetchChainData() {
//   try {
//     // Fetch the JSON data
//     const response = await fetch('https://chainid.network/chains_mini.json');
//
//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//
//     // Parse the JSON data
//     const data = await response.json();
//
//     console.log(data);
//     // Display the data on the page
//     // const chainDataDiv = document.getElementById('chain-data');
//     // chainDataDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//   } catch (error) {
//     console.error('Error fetching chain data:', error);
//   }
// }

const App = () => {
  const mainnetRpcUrls = {
    "https://rpc.darwinia.network": {
      name: "Darwinia",
      chainId: 46
    },
    "https://darwinia-rpc.dwellir.com": {
      name: "Darwinia",
      chainId: 46
    },
    "https://darwinia-rpc.darwiniacommunitydao.xyz": {
      name: "Darwinia",
      chainId: 46
    },
    "https://cors.kahub.in/http://38.242.135.236:6644": {
      name: "Darwinia",
      chainId: 46
    },
    "https://crab-rpc.darwinia.network": {
      name: "Darwinia Crab",
      chainId: 44
    },
    "https://crab-rpc.darwiniacommunitydao.xyz": {
      name: "Darwinia Crab",
      chainId: 44
    },
    "https://cors.kahub.in/http://38.242.135.236:9944": {
      name: "Darwinia Crab",
      chainId: 44
    },
    "https://rpc.api.moonbeam.network": {
      name: "Moonbeam",
      chainId: 1284
    },
    "https://moonbeam-rpc.publicnode.com": {
      name: "Moonbeam",
      chainId: 1284
    }
  };
  const testnetRpcUrls = {
    "https://pangolin-rpc.darwinia.network": {
      name: "Darwinia Pangolin",
      chainId: 43
    },
    "https://fraa-flashbox-2871-rpc.a.stagenet.tanssi.network": {
      name: "Darwinia Tanssi Pangoro",
      chainId: 45
    },
  };

  return (
    <div class="antialiased bg-gray-100 text-gray-600 flex flex-col justify-center">
      <UrlsTestPanel title="MAINNET" rpcUrls={mainnetRpcUrls} concurrency="20" />
      <UrlsTestPanel title="TESTNET" rpcUrls={testnetRpcUrls} concurrency="10" />
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
