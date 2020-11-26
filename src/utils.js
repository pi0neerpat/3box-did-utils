import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "@ceramicnetwork/key-did-resolver";

import { randomString, randomBytes } from "@stablelib/random";

const didJWT = require("did-jwt");

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
    resolver: KeyResolver.getResolver(),
  });
  const { kid, payload } = await did.verifyJWS(jws);
  return { kid, payload, id: kid.split("#")[0] };
};

const issueGithubClaim = async (did, username, verification_url) => {
  const signer = didJWT.SimpleSigner("04fff936f805ee2");
  return didJWT
    .createJWT(
      {
        sub: did,
        nbf: Math.floor(Date.now() / 1000),
        vc: {
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiableCredential"],
          credentialSubject: {
            account: {
              type: "Github",
              username,
              url: verification_url,
            },
          },
        },
      },
      {
        issuer: "did:https:verifications.3box.io",
        signer,
      }
    )
    .then((jwt) => {
      return jwt;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { createDid, signDid, verifyJWS, issueGithubClaim };
