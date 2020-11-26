import { randomBytes } from "@stablelib/random";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "@ceramicnetwork/key-did-resolver";

import { verifyJWS as v } from "did-jwt";
import * as u8a from "uint8arrays";

const B64_URL = "base64url";

//  Client side
const createDid = async (seed) => {
  let provider = new Ed25519Provider(randomBytes(32));
  if (seed) provider = new Ed25519Provider(seed);
  const did = new DID({ provider });
  await did.authenticate();
  return did;
};

const signDid = async (did, content) => {
  return did.createJWS(content);
};

// Serverside
function base64urlToJSON(s) {
  return JSON.parse(u8a.toString(u8a.fromString(s, B64_URL)));
}

const verifyJWS = async (jws) => {
  const did = new DID({
    resolver: { registry: { ...KeyResolver.getResolver() } },
  });
  // Method A
  const unwrapped = await did.verifyJWS(jws);
  console.log(unwrapped.kid.split("#")[1]);
  // Method B from https://github.com/ceramicnetwork/js-did/blob/b110d17137d2ec08e93023f69f53c0ce71e09703/src/index.ts#L211
  const { kid } = base64urlToJSON(jws.split(".")[0]);
  const resolved = await did.resolve(kid);
  console.log(resolved);
};

export { createDid, signDid, verifyJWS };
