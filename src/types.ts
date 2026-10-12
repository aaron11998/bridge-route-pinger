/**
 * Bridge Route Pinger - Shared Types
 * Bounty #10: Bridge Route Pinger
 */

// Supported chains
export type ChainId = "ethereum" | "arbitrum" | "optimism" | "base" | "polygon" | "bsc" | "avalanche";

// Chain configuration
export interface ChainConfig {
  name: ChainId;
  rpcUrl: string;
  nativeToken: string;
  nativeTokenPriceUsd: number;
  chainId: number; // EVM chain ID
  blockExplorerUrl: string;
}

// Bridge configuration
export interface BridgeConfig {
  name: string;
  supportedChains: ChainId[];
  apiUrl?: string;
  contractAddresses?: Record<ChainId, string>;
  feeBps?: number;
  minAmount?: string;
  maxAmount?: string;
}

// Bridge route
export interface BridgeRoute {
  bridge: string;
  fromChain: ChainId;
  toChain: ChainId;
  token: string;
  amount: string;
  feeUsd: number;
  feeNative: string;
  etaMinutes: number;
  requirements: string[];
  contractAddress?: string;
  txData?: string; // Encoded transaction data for initiating bridge
}

// Bridge request
export interface BridgeRequest {
  token: string;
  amount: string; // Wei as string
  fromChain: ChainId;
  toChain: ChainId;
  maxRoutes?: number; // Max routes to return (default: 5)
}

// Bridge response
export interface BridgeResponse {
  token: string;
  amount: string;
  fromChain: ChainId;
  toChain: ChainId;
  routes: BridgeRoute[];
  bestRoute: BridgeRoute | null;
  warnings: string[];
  timestamp: number;
}

// Health endpoint response
export interface HealthResponse {
  status: "ok" | "degraded";
  chains: Record<ChainId, { configured: boolean; lastBlock?: number }>;
  bridges: Record<string, boolean>;
  timestamp: number;
}

// x402 manifest
export interface X402Manifest {
  x402Version: number;
  resource: string;
  description: string;
  accepts: Array<{
    scheme: "exact";
    network: string;
    asset: string;
    payTo: string;
    maxAmountRequired: string;
    resource: string;
    description: string;
  }>;
  free: string[];
}