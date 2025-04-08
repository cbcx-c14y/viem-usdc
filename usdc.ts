import { createPublicClient, http, parseAbiItem } from 'viem';
import { mainnet } from 'viem/chains';

const USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const TRANSFER_EVENT_ABI = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)'
);


async function fetchUSDCTransfers() {


  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const latestBlock = await client.getBlockNumber();
  const startBlock = latestBlock - 100n;
  const logs = await client.getLogs({
    address: USDC_CONTRACT_ADDRESS,
    event: TRANSFER_EVENT_ABI,
    fromBlock: startBlock,
    toBlock: latestBlock,
  });


  logs.forEach((log) => {
    const { args, transactionHash } = log;
    const from = args.from;
    const to = args.to;
    const value = Number(args.value) / 1e6;
    console.log(
      `从 ${from} 转账给 ${to} ${value.toFixed(5)} USDC ,交易ID：${transactionHash}`
    );
  });
}

fetchUSDCTransfers().catch((error) => {
  console.error('Error transfers:', error);
});
