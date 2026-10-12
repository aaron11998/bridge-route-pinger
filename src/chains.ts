/**
 * Bridge Route Pinger - Chain & Bridge Configurations + Bridge Engine
 * Bounty #10: Bridge Route Pinger
 */

import { ChainConfig, ChainId, BridgeConfig, BridgeRoute, BridgeRequest, BridgeResponse } from "./types";

export const CHAINS: Record<ChainId, ChainConfig> = {
  ethereum: {
    name: "ethereum",
    rpcUrl: "",
    nativeToken: "ETH",
    nativeTokenPriceUsd: 2600,
    chainId: 1,
    blockExplorerUrl: "https://api.etherscan.io/api",
  },
  arbitrum: {
    name: "arbitrum",
    rpcUrl: "",
    nativeToken: "ETH",
    nativeTokenPriceUsd: 2600,
    chainId: 42161,
    blockExplorerUrl: "https://api.arbiscan.io/api",
  },
  optimism: {
    name: "optimism",
    rpcUrl: "",
    nativeToken: "ETH",
    nativeTokenPriceUsd: 2600,
    chainId: 10,
    blockExplorerUrl: "https://api-optimistic.etherscan.io/api",
  },
  base: {
    name: "base",
    rpcUrl: "",
    nativeToken: "ETH",
    nativeTokenPriceUsd: 2600,
    chainId: 8453,
    blockExplorerUrl: "https://api.basescan.org/api",
  },
  polygon: {
    name: "polygon",
    rpcUrl: "",
    nativeToken: "MATIC",
    nativeTokenPriceUsd: 0.8,
    chainId: 137,
    blockExplorerUrl: "https://api.polygonscan.com/api",
  },
  bsc: {
    name: "bsc",
    rpcUrl: "",
    nativeToken: "BNB",
    nativeTokenPriceUsd: 300,
    chainId: 56,
    blockExplorerUrl: "https://api.bscscan.com/api",
  },
  avalanche: {
    name: "avalanche",
    rpcUrl: "",
    nativeToken: "AVAX",
    nativeTokenPriceUsd: 25,
    chainId: 43114,
    blockExplorerUrl: "https://api.snowtrace.io/api",
  },
};

// Known bridges and their supported chains
export const BRIDGES: BridgeConfig[] = [
  {
    name: "Hop Protocol",
    supportedChains: ["ethereum", "arbitrum", "optimism", "base", "polygon"],
    apiUrl: "https://api.hop.exchange/v1",
    feeBps: 4, // 0.04%
  },
  {
    name: "Across Protocol",
    supportedChains: ["ethereum", "arbitrum", "optimism", "base", "polygon"],
    apiUrl: "https://api.across.to",
    feeBps: 5, // 0.05%
  },
  {
    name: "Synapse",
    supportedChains: ["ethereum", "arbitrum", "optimism", "base", "polygon", "bsc", "avalanche"],
    apiUrl: "https://synapseapi.com",
    feeBps: 5,
  },
  {
    name: "Orbiter Finance",
    supportedChains: ["ethereum", "arbitrum", "optimism", "base", "polygon", "avalanche"],
    apiUrl: "https://api.orbiter.finance",
    feeBps: 3,
  },
  {
    name: "Stargate",
    supportedChains: ["ethereum", "arbitrum", "optimism", "base", "polygon", "bsc", "avalanche"],
    apiUrl: "https://api.stargate.finance",
    feeBps: 6,
  },
  {
    name: "Celer cBridge",
    supportedChains: ["ethereum", "arbitrum", "optimism", "base", "polygon", "bsc", "avalanche"],
    apiUrl: "https://api.celer.network",
    feeBps: 4,
  },
  {
    name: "Multichain (Anyswap)",
    supportedChains: ["ethereum", "arbitrum", "optimism", "polygon", "bsc", "avalanche"],
    apiUrl: "https://api.multichain.org",
    feeBps: 5,
  },
];

// Token mappings for common tokens across chains
export const TOKEN_ADDRESSES: Record<ChainId, Record<string, string>> = {
  ethereum: {
    "USDC": "0xA0b86a33E6441b8C4505B0e33B4A5d4D8F6c6d12",
    "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "WETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  arbitrum: {
    "USDC": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    "USDT": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    "DAI": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    "WETH": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  },
  optimism: {
    "USDC": "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    "USDT": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    "DAI": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    "WETH": "0x4200000000000000000000000000000000000006",
  },
  base: {
    "USDC": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "DAI": "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    "WETH": "0x4200000000000000000000000000000000000006",
  },
  polygon: {
    "USDC": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    "USDT": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    "DAI": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    "WETH": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  },
  bsc: {
    "USDC": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    "USDT": "0x55d398326f99059fF775485246999027B3197955",
    "BUSD": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    "WBNB": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  avalanche: {
    "USDC": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    "USDT": "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    "WAVAX": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  },
};

export function getChainConfig(chain: ChainId): ChainConfig {
  const config = CHAINS[chain];
  if (!config) throw new Error(`Unknown chain: ${chain}`);
  return config;
}

export function getConfiguredChains(env: { [key: string]: string }): ChainId[] {
  const chains: ChainId[] = [];
  for (const chain of Object.keys(CHAINS) as ChainId[]) {
    const envKey = `${chain.toUpperCase()}_RPC_URL`;
    if (env[envKey]) {
      chains.push(chain);
    }
  }
  return chains;
}

export function getBridgesForRoute(fromChain: ChainId, toChain: ChainId): BridgeConfig[] {
  return BRIDGES.filter(b => 
    b.supportedChains.includes(fromChain) && b.supportedChains.includes(toChain)
  );
}

export function getTokenAddress(chain: ChainId, symbol: string): string | undefined {
  return TOKEN_ADDRESSES[chain]?.[symbol.toUpperCase()];
}

// ETA estimates per bridge (in minutes)
const BRIDGE_ETAS: Record<string, Record<string, number>> = {
  "Hop Protocol": { "ethereum-arbitrum": 5, "ethereum-optimism": 5, "ethereum-base": 5, "ethereum-polygon": 10, "default": 15 },
  "Across Protocol": { "ethereum-arbitrum": 2, "ethereum-optimism": 2, "ethereum-base": 2, "ethereum-polygon": 5, "default": 10 },
  "Synapse": { "ethereum-arbitrum": 10, "ethereum-optimism": 10, "ethereum-base": 10, "ethereum-polygon": 15, "default": 20 },
  "Orbiter Finance": { "ethereum-arbitrum": 3, "ethereum-optimism": 3, "ethereum-base": 3, "ethereum-polygon": 5, "default": 10 },
  "Stargate": { "ethereum-arbitrum": 15, "ethereum-optimism": 15, "ethereum-base": 15, "ethereum-polygon": 20, "default": 30 },
  "Celer cBridge": { "ethereum-arbitrum": 5, "ethereum-optimism": 5, "ethereum-base": 5, "ethereum-polygon": 10, "default": 15 },
  "Multichain (Anyswap)": { "ethereum-arbitrum": 10, "ethereum-optimism": 10, "ethereum-base": 10, "ethereum-polygon": 15, "default": 20 },
};

function getBridgeEta(bridgeName: string, fromChain: ChainId, toChain: ChainId): number {
  const etas = BRIDGE_ETAS[bridgeName];
  if (!etas) return 15;
  const key = `${fromChain}-${toChain}`;
  return etas[key] || etas.default || 15;
}

function estimateBridgeFee(bridge: BridgeConfig, amount: string, fromChain: ChainId, toChain: ChainId): { feeUsd: number; feeNative: string } {
  const amountNum = parseFloat(amount) / 1e18;
  const fromChainConfig = CHAINS[fromChain];
  const feeBps = bridge.feeBps || 5;
  const feeNative = amountNum * (feeBps / 10000);
  const feeUsd = feeNative * fromChainConfig.nativeTokenPriceUsd;
  return { feeUsd, feeNative: feeNative.toFixed(6) };
}

function generateBridgeTxData(bridge: BridgeConfig, token: string, amount: string, fromChain: ChainId, toChain: ChainId): string {
  // In production, would encode actual bridge contract calls
  // For now, return placeholder
  return `0x${bridge.name.toLowerCase().replace(/\s+/g, '')}_${fromChain}_${toChain}_${token}_${amount}`;
}

export async function findBridgeRoutes(request: BridgeRequest): Promise<BridgeResponse> {
  const bridges = getBridgesForRoute(request.fromChain, request.toChain);
  const warnings: string[] = [];
  
  if (bridges.length === 0) {
    warnings.push(`No bridges found for ${request.fromChain} -> ${request.toChain}`);
    return {
      token: request.token,
      amount: request.amount,
      fromChain: request.fromChain,
      toChain: request.toChain,
      routes: [],
      bestRoute: null,
      warnings,
      timestamp: Date.now(),
    };
  }
  
  const routes: BridgeRoute[] = [];
  
  for (const bridge of bridges) {
    try {
      const fee = estimateBridgeFee(bridge, request.amount, request.fromChain, request.toChain);
      const etaMinutes = getBridgeEta(bridge.name, request.fromChain, request.toChain);
      
      // Check if token is supported on both chains
      const fromTokenAddr = getTokenAddress(request.fromChain, request.token);
      const toTokenAddr = getTokenAddress(request.toChain, request.token);
      
      if (!fromTokenAddr || !toTokenAddr) {
        warnings.push(`${bridge.name}: Token ${request.token} may not be supported on both chains`);
      }
      
      const route: BridgeRoute = {
        bridge: bridge.name,
        fromChain: request.fromChain,
        toChain: request.toChain,
        token: request.token,
        amount: request.amount,
        feeUsd: fee.feeUsd,
        feeNative: fee.feeNative,
        etaMinutes,
        requirements: [
          `Gas on ${request.fromChain} for approval + bridge tx`,
          `Gas on ${request.toChain} for claim (if applicable)`,
        ],
        contractAddress: bridge.contractAddresses?.[request.fromChain],
        txData: generateBridgeTxData(bridge, request.token, request.amount, request.fromChain, request.toChain),
      };
      
      routes.push(route);
    } catch (e) {
      warnings.push(`${bridge.name}: Failed to estimate - ${e}`);
    }
  }
  
  // Sort by total cost (fee + estimated gas)
  routes.sort((a, b) => a.feeUsd - b.feeUsd);
  
  const bestRoute = routes.length > 0 ? routes[0] : null;
  
  return {
    token: request.token,
    amount: request.amount,
    fromChain: request.fromChain,
    toChain: request.toChain,
    routes,
    bestRoute,
    warnings,
    timestamp: Date.now(),
  };
}

export type { ChainConfig, BridgeConfig, BridgeRoute } from "./types";
export { getBridgeEta, estimateBridgeFee };