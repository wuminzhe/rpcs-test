import { testRpcs } from "./test_rpcs.js";
import { useState, useEffect } from "preact/hooks";

function buildNewResults(oldResults, result) {
  const newResults = [...oldResults];
  const index = oldResults.findIndex((r) => r.rpcUrl === result.rpcUrl);
  oldResults[index] = result;
  return oldResults;
}

function emptyResults(rpcUrls) {
  return rpcUrls.map((rpcUrl) => {
    return {
      rpcUrl: rpcUrl,
      average: 0,
      median: 0,
      standardDeviation: 0,
    };
  }).sort((a, b) => a.rpcUrl.localeCompare(b.rpcUrl));
}

export const UrlsTestPanel = ({ title, rpcUrls }) => {

  const [results, setResults] = useState(
    emptyResults(rpcUrls)
  );

  useEffect(() => {
    testRpcs(rpcUrls).then((newResults) => {
      setResults(newResults);
    });
  }, []);

  return (
    <section class="antialiased bg-gray-100 text-gray-600 px-4 py-2">
      <div class="flex flex-col justify-center h-full">
        <div class="w-full max-w-2xl mx-auto bg-white rounded-sm border border-gray-200">
          <header class="px-5 py-4 border-b border-gray-100">
            <h2 class="font-semibold text-gray-800">{title}</h2>
          </header>
          <div class="p-3">
            <div class="overflow-x-auto">
              <table class="table-auto w-full">
                <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">Json Rpc Url</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Mean</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">Median</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">
                        Standard Deviation
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody id="latencies" class="text-sm divide-y divide-gray-100">
                  {results.map((result) => (
                    <tr>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="font-medium text-gray-800">
                            {result.rpcUrl}
                          </div>
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left text-center">
                          {
                            result.error ?
                              result.error :
                              result.average == 0 ?
                                'testing' :
                                `${Math.round(result.average)} ms`
                          }
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left text-center">
                          {
                            result.error ?
                              '' :
                              result.median == 0 ?
                                'testing' :
                                `${Math.round(result.median)} ms`
                          }
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left text-center">
                          {
                            result.error ?
                              '' :
                              result.standardDeviation == 0 ?
                                'testing' :
                                `${Math.round(result.standardDeviation)} ms`
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
