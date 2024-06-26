import { testRpc } from "./test_rpcs.js";
import { useState, useEffect } from "preact/hooks";

function buildNewResults(oldResults, result) {
  const index = oldResults.findIndex((r) => r.rpcUrl === result.rpcUrl);
  const oldResult = oldResults[index];

  const newResults = [...oldResults];
  newResults[index] = {
    rpcUrl: result.rpcUrl,
    name: oldResult.name,
    chainId: oldResult.chainId,
    average: result.average,
    median: result.median,
    standardDeviation: result.standardDeviation,
    blockNumbers: result.blockNumbers,
  };
  return newResults;
}

// {
//    "https://rpc.darwinia.network": {
//       name: "Darwinia",
//       chainId: 46,
//    },
// }
function buildEmptyResults(rpcUrls) {
  const urls = Object.keys(rpcUrls);
  return urls.map((url) => {
    return {
      rpcUrl: url,
      name: rpcUrls[url].name,
      chainId: rpcUrls[url].chainId,
      average: 0,
      median: 0,
      standardDeviation: 0,
      blockNumbers: []
    };
  })
}

export const UrlsTestPanel = ({ title, rpcUrls, concurrency }) => {

  const [results, setResults] = useState(
    buildEmptyResults(rpcUrls)
  );

  useEffect(() => {
    const urls = Object.keys(rpcUrls);
    urls.forEach(url => {
      testRpc(url, parseInt(concurrency)).then((result) => {
        setResults((oldResults) => buildNewResults(oldResults, result));
      });
    });
  }, []);

  return (
    <section class="antialiased bg-gray-100 text-gray-600 px-4 py-4 w-full">
      <div class="flex flex-col justify-center h-full w-full">
        <div class="w-full mx-auto bg-white rounded-sm border border-gray-200">
          <header class="px-5 py-4 border-b border-gray-100">
            <h2 class="font-semibold text-gray-800">{title}</h2>
          </header>
          <div class="p-3">
            <div class="overflow-x-auto">
              <table class="table-auto w-full">
                <thead class="text-xs font-semibold text-gray-400 bg-gray-50">
                  <tr>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">ChainId</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Network</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Json Rpc Url</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-right">Succeeded</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-right">Block Numbers</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-right">M<br />(ms)</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-right">Mdn<br />(ms)</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-right">s.d.<br />(ms)</div>
                    </th>
                  </tr>
                </thead>
                <tbody id="latencies" class="text-sm divide-y divide-gray-100">
                  {results.map((result) => (
                    <tr>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="font-medium text-gray-800">
                            {result.chainId}
                          </div>
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="font-medium text-gray-800">
                            {result.name}
                          </div>
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="font-medium text-gray-800">
                            {result.rpcUrl}
                          </div>
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-right">
                          {
                            (() => {
                              if (result.error) {
                                return result.error;
                              } else if (result.blockNumbers.length === 0) {
                                return 'testing';
                              } else if ((result.blockNumbers.length / concurrency) < 1) {
                                return <span style={{ backgroundColor: 'red', color: 'yellow' }}> {result.blockNumbers.length}/{concurrency} </span>;
                              } else {
                                return `${result.blockNumbers.length}/${concurrency}`;
                              }
                            })()
                          }
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-right">
                          {
                            result.error ?
                              result.error :
                              result.blockNumbers.length == 0 ?
                                'testing' :
                                `${[...new Set(result.blockNumbers)].join(", ")}`
                          }

                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-right">
                          {
                            result.error ?
                              result.error :
                              result.average == 0 ?
                                'testing' :
                                Math.round(result.average)
                          }
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-right">
                          {
                            result.error ?
                              result.error :
                              result.median == 0 ?
                                'testing' :
                                Math.round(result.median)
                          }
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-right">
                          {
                            result.error ?
                              result.error :
                              result.standardDeviation == 0 ?
                                'testing' :
                                Math.round(result.standardDeviation)
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
