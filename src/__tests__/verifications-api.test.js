import { randomString, randomBytes } from "@stablelib/random";
import fetch from "node-fetch";

const { createDid, signDid, verifyJWS } = require("../utils");

let did = null;
let challengeCode = null;
let attestation = null;

const URL = "http://localhost:3000";
const GITHUB_USERNAME = "pi0neerpat";
const DID_SEED = [
  217,
  125,
  91,
  58,
  165,
  168,
  236,
  64,
  91,
  223,
  99,
  76,
  213,
  106,
  3,
  208,
  223,
  127,
  41,
  192,
  216,
  120,
  141,
  137,
  103,
  129,
  226,
  208,
  179,
  68,
  30,
  7,
];
describe("API", () => {
  beforeAll(() => {});

  test("createDid", (done) => {
    // const seed = randomBytes(32);
    createDid(DID_SEED).then((res) => {
      did = res;
      expect(/did:key:[a-zA-Z0-9]{48}/.test(did.id)).toBe(true);
      console.log(did.id);
      done();
    });
  });

  test("request-github", async (done) => {
    const res = await fetch(`${URL}/api/v0/request-github`, {
      method: "POST",
      body: JSON.stringify({
        username: GITHUB_USERNAME,
        did: did.id,
      }),
    });
    const data = await res.json();
    challengeCode = data.data.challengeCode;
    expect(challengeCode).not.toBeNull();
    done();
  });

  test("confirm-github", async (done) => {
    const jws = await signDid(did, { challengeCode });

    // Await 1s for the challengeCode to update in the db
    await new Promise((res) => setTimeout(res, 1000));

    const res = await fetch(`${URL}/api/v0/confirm-github`, {
      method: "POST",
      body: JSON.stringify({
        jws,
      }),
    });
    const data = await res.json();
    expect(data.data).not.toBeUndefined();
    ({ attestation } = data.data);
    expect(attestation).not.toBeUndefined();
    expect(data.status).toBe("success");
    console.log(attestation);
    done();
  });

  test("verifyCredential", (done) => {
    verifyJWS(attestation).then(({ payload, id }) => {
      console.log(payload);
      console.log(id);
      done();
    });
  });
});
