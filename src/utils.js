import { randomBytes } from "@stablelib/random";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";

import KeyResolver from "@ceramicnetwork/key-did-resolver";

//  Client side
const createDid = async () => {
  const seed = randomBytes(32);
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider });
  await did.authenticate();
  return did;
};

const signDid = async (did, content) => {
  return did.createJWS(content);
};

// Serverside
const verifyJWS = async (jws) => {
  const did = new DID({
    resolver: { registry: { ...KeyResolver.getResolver() } },
  });
  console.log(Object.keys(did));
  console.log(Object.keys(did._resolver));
  console.log(did._resolver.registry);
  await did.verifyJWS(jws); // will throw if the jws is incorrect
};

export { createDid, signDid, verifyJWS };
