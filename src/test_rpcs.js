const latency = async (rpc_url, request_body) => {
  const url = new URL(rpc_url);
  const http = new XMLHttpRequest();
  http.open("POST", url.href);
  http.setRequestHeader("Content-Type", "application/json");

  const startTime = performance.now();
  const responsePromise = new Promise((resolve, reject) => {
    http.onload = () => {
      if (http.status === 200) {
        resolve(http.responseText);
      } else {
        reject(new Error(`Response Code: ${http.status}`));
      }
    };
    http.onerror = () => {
      reject(new Error("Network Error"));
    };
  });

  http.send(JSON.stringify(request_body));
  const result = await responsePromise;

  const endTime = performance.now();
  const latency = endTime - startTime;
  return { latency, result };
};

function calculateAverage(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  const average = sum / numbers.length;

  return average;
}

function calculateMedian(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  // 先对数组进行排序
  const sortedNumbers = numbers.sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNumbers.length / 2);

  // 如果数组长度为奇数，直接返回中间元素
  if (sortedNumbers.length % 2 === 1) {
    return sortedNumbers[middleIndex];
  }

  // 如果数组长度为偶数，取中间两个元素的平均值
  return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
}

function calculateVariance(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  const mean = calculateAverage(numbers);

  const squaredDifferences = numbers.map((num) => Math.pow(num - mean, 2));
  const variance =
    squaredDifferences.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    ) / numbers.length;

  return variance;
}

function calculateStandardDeviation(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  const variance = calculateVariance(numbers);
  const standardDeviation = Math.sqrt(variance);

  return standardDeviation;
}

const latency_n = async (rpcUrl, request_body, n) => {
  const latencies = [];
  const blockNumbers = [];
  for (let i = 0; i < n; i++) {
    const result = await latency(rpcUrl, request_body);
    latencies.push(result.latency);
    blockNumbers.push(parseInt(JSON.parse(result.result).result, 16));
  }

  const average = latencies.reduce((acc, v) => acc + v) / latencies.length;
  const median = calculateMedian(latencies);
  const variance = calculateVariance(latencies);
  const standardDeviation = calculateStandardDeviation(latencies);
  return { rpcUrl, average, median, standardDeviation, blockNumbers };
};

export const testRpc = async (rpcUrl) => {
  const request_body = {
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1,
  };

  const testCount = 20;

  try {
    return await latency_n(rpcUrl, request_body, testCount);
  } catch (error) {
    return {
      rpcUrl,
      average: 0,
      median: 0,
      standardDeviation: 0,
      blockNumbers: [],
      error,
    };
  }
}

export const testRpcs = async (rpcUrls) => {
  const request_body = {
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1,
  };

  const testCount = 20;

  let result = await Promise.allSettled(
    rpcUrls.map((rpcUrl) => {
      return latency_n(rpcUrl, request_body, testCount);
    })
  );

  result = result.map((r, i) => {
    if (r.status === "fulfilled") {
      return r.value;
    } else {
      return {
        rpcUrl: rpcUrls[i],
        average: 0,
        median: 0,
        standardDeviation: 0,
        error: r.reason,
      };
    }
  });

  return result.sort((a, b) => a.rpcUrl.localeCompare(b.rpcUrl))
};
