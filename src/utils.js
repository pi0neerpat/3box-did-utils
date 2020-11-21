import { randomBytes } from "@stablelib/random";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";

// Serverside
// import { DID } from 'dids'
import KeyResolver from "@ceramicnetwork/key-did-resolver";

// Resolver
import Ceramic from "@ceramicnetwork/ceramic-http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

//  Client side
const createDid = async () => {
  const seed = randomBytes(32);
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider });
  await did.authenticate();
  // log the DID
  return did;
};

const signDid = async (did, content) => {
  return did.createJWS(content);
};

// Serverside
const verifyJWS = async (jws) => {
  const did = new DID({ resolver: { registry: KeyResolver.getResolver() } });
  console.log(Object.keys(did));
  console.log(Object.keys(did._resolver));
  console.log(did._resolver.registry);
  await did.verifyJWS(jws); // will throw if the jws is incorrect
};

// Reolver
//
// const ceramic = new Ceramic(<url-of-ceramic-gateway>)

// const registry = {
// 	...ThreeIdResolver.getResolver(),
// 	...KeyResolver.getResolver()
// }
// const did = new DID({ resolver: { registry } })

// }
// };

export { createDid, signDid, verifyJWS };
