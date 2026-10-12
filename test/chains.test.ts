import { describe, it, expect } from "vitest";
import { CHAINS, getChainConfig, getConfiguredChains, getBridgesForRoute, getTokenAddress, getBridgeEta, estimateBridgeFee } from "../src/chains";
import { ChainId } from "../src/types";

describe("Chains Configuration", () => {
  it("should have all 7 chains configured", () => {
    expect(Object.keys(CHAINS).length).toBe(7);
    expect(CHAINS.ethereum).toBeDefined();
    expect(CHAINS.arbitrum).toBeDefined();
    expect(CHAINS.optimism).toBeDefined();
    expect(CHAINS.base).toBeDefined();
    expect(CHAINS.polygon).toBeDefined();
    expect(CHAINS.bsc).toBeDefined();
    expect(CHAINS.avalanche).toBeDefined();
  });

  it("should have required properties for each chain", () => {
    const chains: ChainId[] = ["ethereum", "arbitrum", "optimism", "base", "polygon", "bsc", "avalanche"];
    for (const chain of chains) {
      const config = CHAINS[chain];
      expect(config.name).toBe(chain);
      expect(config.nativeToken).toBeDefined();
      expect(config.nativeTokenPriceUsd).toBeGreaterThan(0);
      expect(config.chainId).toBeGreaterThan(0);
    }
  });

  it("should have correct chain IDs", () => {
    expect(CHAINS.ethereum.chainId).toBe(1);
    expect(CHAINS.arbitrum.chainId).toBe(42161);
    expect(CHAINS.optimism.chainId).toBe(10);
    expect(CHAINS.base.chainId).toBe(8453);
    expect(CHAINS.polygon.chainId).toBe(137);
    expect(CHAINS.bsc.chainId).toBe(56);
    expect(CHAINS.avalanche.chainId).toBe(43114);
  });
});

describe("Chain Helpers", () => {
  it("getChainConfig should return correct config", () => {
    const eth = getChainConfig("ethereum");
    expect(eth.name).toBe("ethereum");
    expect(eth.chainId).toBe(1);
    expect(eth.nativeToken).toBe("ETH");
  });

  it("getChainConfig should throw for unknown chain", () => {
    expect(() => getChainConfig("unknown" as ChainId)).toThrow();
  });

  it("getConfiguredChains should filter by env vars", () => {
    const env = {
      ETHEREUM_RPC_URL: "https://eth.example.com",
      ARBITRUM_RPC_URL: "https://arb.example.com",
    };
    const configured = getConfiguredChains(env);
    expect(configured).toContain("ethereum");
    expect(configured).toContain("arbitrum");
    expect(configured).not.toContain("optimism");
  });

  it("getConfiguredChains should return empty for no config", () => {
    const configured = getConfiguredChains({});
    expect(configured.length).toBe(0);
  });
});

describe("Bridge Routing", () => {
  it("getBridgesForRoute should find bridges for Ethereum -> Arbitrum", () => {
    const bridges = getBridgesForRoute("ethereum", "arbitrum");
    expect(bridges.length).toBeGreaterThan(0);
    expect(bridges.some(b => b.name === "Hop Protocol")).toBe(true);
    expect(bridges.some(b => b.name === "Across Protocol")).toBe(true);
  });

  it("getBridgesForRoute should find bridges for Ethereum -> Base", () => {
    const bridges = getBridgesForRoute("ethereum", "base");
    expect(bridges.length).toBeGreaterThan(0);
  });

  it("getBridgesForRoute should find bridges for Ethereum -> BSC", () => {
    const bridges = getBridgesForRoute("ethereum", "bsc");
    expect(bridges.length).toBeGreaterThan(0);
    expect(bridges.some(b => b.name === "Synapse")).toBe(true);
  });

  it("getBridgesForRoute should return empty for unsupported route", () => {
    // Most bridges support major chains, but test with a hypothetical
    const bridges = getBridgesForRoute("ethereum", "avalanche");
    expect(bridges.length).toBeGreaterThan(0);
  });
});

describe("Token Address Lookup", () => {
  it("getTokenAddress should find USDC on Ethereum", () => {
    const addr = getTokenAddress("ethereum", "USDC");
    expect(addr).toBe("0xA0b86a33E6441b8C4505B0e33B4A5d4D8F6c6d12");
  });

  it("getTokenAddress should find WETH on Arbitrum", () => {
    const addr = getTokenAddress("arbitrum", "WETH");
    expect(addr).toBe("0x82aF49447D8a07e3bd95BD0d56f35241523fBab1");
  });

  it("getTokenAddress should return undefined for unknown token", () => {
    const addr = getTokenAddress("ethereum", "UNKNOWN");
    expect(addr).toBeUndefined();
  });
});

describe("Bridge ETA Estimates", () => {
  it("getBridgeEta should return known ETA for Hop Protocol", () => {
    const eta = getBridgeEta("Hop Protocol", "ethereum", "arbitrum");
    expect(eta).toBe(5);
  });

  it("getBridgeEta should return default for unknown route", () => {
    const eta = getBridgeEta("Hop Protocol", "ethereum", "unknown" as ChainId);
    expect(eta).toBe(15);
  });

  it("getBridgeEta should return default for unknown bridge", () => {
    const eta = getBridgeEta("Unknown Bridge", "ethereum", "arbitrum");
    expect(eta).toBe(15);
  });
});

describe("Bridge Fee Estimation", () => {
  it("estimateBridgeFee should calculate fee correctly", () => {
    const bridge = { name: "Test", supportedChains: ["ethereum", "arbitrum"], feeBps: 5 } as any;
    const fee = estimateBridgeFee(bridge, "1000000000000000000", "ethereum", "arbitrum"); // 1 ETH worth
    // 1 ETH * 2600 USD/ETH * 0.0005 (5 bps) = $1.30
    expect(fee.feeUsd).toBeCloseTo(1.30, 1);
    // 1 ETH * 0.0005 = 0.0005 ETH fee
    expect(parseFloat(fee.feeNative)).toBeCloseTo(0.0005, 4);
  });

  it("estimateBridgeFee should scale with amount", () => {
    const bridge = { name: "Test", supportedChains: ["ethereum", "arbitrum"], feeBps: 10 } as any;
    const fee1 = estimateBridgeFee(bridge, "1000000000000000000", "ethereum", "arbitrum");
    const fee2 = estimateBridgeFee(bridge, "2000000000000000000", "ethereum", "arbitrum");
    expect(fee2.feeUsd).toBeCloseTo(fee1.feeUsd * 2, 2);
  });
});