/**
 * Bridge Route Pinger - x402 Bridge Endpoint
 * Bounty #10: Bridge Route Pinger
 */

import { BridgeRequest, BridgeResponse, X402Manifest } from "./types";
import { findBridgeRoutes } from "./chains";

const X402_NETWORK = "eip155:8453";
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const ORG_EVM_PAYTO = "0x76EfB727cd3271C7DE22f92437Be212766C9631f";

export async function handleBridge(request: Request, env: { [key: string]: string }): Promise<Response> {
  try {
    const body: BridgeRequest = await request.json();
    
    // Validate required fields
    if (!body.token || !body.amount || !body.fromChain || !body.toChain) {
      return new Response(JSON.stringify({ error: "Missing required fields: token, amount, fromChain, toChain" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find bridge routes
    const result = await findBridgeRoutes(body);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function handleX402Manifest(): Promise<Response> {
  const manifest: X402Manifest = {
    x402Version: 2,
    resource: "/bridge",
    description: "Bridge Route Pinger: Find viable bridge routes and live fee/time quotes",
    accepts: [
      {
        scheme: "exact",
        network: X402_NETWORK,
        asset: USDC_BASE,
        payTo: ORG_EVM_PAYTO,
        maxAmountRequired: "10000", // $0.01 in USDC base units
        resource: "/bridge",
        description: "One /bridge API call",
      },
    ],
    free: ["/health", "/.well-known/x402.json"],
  };
  
  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}