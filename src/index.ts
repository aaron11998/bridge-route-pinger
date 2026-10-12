/**
 * Bridge Route Pinger - Main Entry Point
 * Bounty #10: Bridge Route Pinger
 * Cloudflare Worker with x402 payment gating
 */

import { Hono } from "hono";
import { paymentMiddleware } from "x402-hono";
import { handleHealth } from "./health";
import { handleBridge, handleX402Manifest } from "./bridge_endpoint";

type Bindings = {
  ORG_EVM_PAYTO: string;
  ETHEREUM_RPC_URL: string;
  ARBITRUM_RPC_URL: string;
  OPTIMISM_RPC_URL: string;
  BASE_RPC_URL: string;
  POLYGON_RPC_URL: string;
  BSC_RPC_URL: string;
  AVALANCHE_RPC_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Free endpoints
app.get("/health", async (c) => {
  const health = await handleHealth(c.env);
  return c.json(health);
});

app.get("/.well-known/x402.json", async (c) => {
  return handleX402Manifest();
});

// Paid endpoint with x402
app.use("/bridge", async (c, next) => {
  const mw = paymentMiddleware(c.env.ORG_EVM_PAYTO as `0x${string}`, {
    "/bridge": {
      price: "$0.01",
      network: "base",
      config: {
        description: "Bridge Route Pinger: Find viable bridge routes and live fee/time quotes",
      },
    },
  });
  return mw(c, next);
});

app.post("/bridge", async (c) => {
  return handleBridge(c.req.raw, c.env);
});

export default app;