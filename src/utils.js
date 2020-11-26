import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "@ceramicnetwork/key-did-resolver";

import { randomString, randomBytes } from "@stablelib/random";

//  Client side
const createDid = async (seed) => {
  if (!seed) throw Error("No public key provided");
  const provider = new Ed25519Provider(seed);

  // v1.0.0 method key-did-provider-ed25519.
  // v1.1.0 dids
  // Fails with "DID is not authenticated" after did.authenticate()
  const did = new DID({ provider, resolver: KeyResolver.getResolver() });

  await did.authenticate();
  return did;
};

const signDid = async (did, content) => {
  return did.createJWS(content);
};

// Serverside
const verifyJWS = async (jws) => {
  const did = new DID({
    // provider: // Necessary for decryptJWE
    resolver: { registry: { ...KeyResolver.getResolver() } },
  });
  const { kid, payload } = await did.verifyJWS(jws);
  console.log(payload);
  console.log(kid);
};

export { createDid, signDid, verifyJWS };
