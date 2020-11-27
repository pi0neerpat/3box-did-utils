import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "@ceramicnetwork/key-did-resolver";
import { getResolver } from "web-did-resolver";

import { randomString, randomBytes } from "@stablelib/random";

const didJWT = require("did-jwt");

const mockServiceDid = {
  "@context": "https://w3id.org/did/v1",
  id: "did:web:verifications.3boxlabs.com",
  publicKey: [
    {
      id: "did:web:verifications.3boxlabs.com#owner",
      type: "Secp256k1VerificationKey2018",
      owner: "did:web:verifications.3boxlabs.com",
      publicKeyHex: "abc123",
    },
  ],
  authentication: [
    {
      type: "Secp256k1SignatureAuthentication2018",
      publicKey: "did:web:verifications.3boxlabs.com#owner",
    },
  ],
};

/// ///////////////////
// Client-side
/// ///////////////////
export const createDid = async (seed) => {
  if (!seed) throw Error("No public key provided");
  const provider = new Ed25519Provider(seed);

  // v1.0.0 method key-did-provider-ed25519.
  // v1.1.0 dids
  // Fails with "DID is not authenticated" after did.authenticate()
  const did = new DID({ provider, resolver: KeyResolver.getResolver() });

  await did.authenticate();
  return did;
};

export const signDid = async (did, content) => {
  return did.createJWS(content);
};

export const verifyJWT = async (jwt, did) => {
  const decoded = didJWT.decodeJWT(jwt);
  const resolveWeb = getResolver().web;
  const mockResolver = (data) => {
    console.log(data);
    return mockServiceDid;
  };
  // console.log(await resolveWeb("did:web:localhost:3000"));
  const verifiedResponse = await didJWT.verifyJWT(jwt, {
    // resolver: { resolve: resolveWeb },
    resolver: { resolve: mockResolver },
    // audience: did,
    // audience: "did:https:verifications.3box.io",
  });
  console.log(verifiedResponse);
  done();
};

/// ///////////////////
// Server-side
/// ///////////////////
export const verifyJWS = async (jws) => {
  const did = new DID({
    resolver: KeyResolver.getResolver(),
  });
  const { kid, payload } = await did.verifyJWS(jws);
  return { kid, payload, id: kid.split("#")[0] };
};

export const issueGithubClaim = async (did, username, verification_url) => {
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
        issuer: "did:web:localhost:3000",
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
