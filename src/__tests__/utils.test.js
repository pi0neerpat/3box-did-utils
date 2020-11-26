import { randomString, randomBytes } from "@stablelib/random";

const { createDid, signDid, verifyJWS } = require("../utils");

let did = null;
let jws = null;
let challengeCode = null;

describe("Utils", () => {
  beforeAll(() => {});

  test("createDid", (done) => {
    createDid(randomBytes(32)).then((res) => {
      did = res;
      expect(/did:key:[a-zA-Z0-9]{48}/.test(did.id)).toBe(true);
      console.log(did.id);
      done();
    });
  });

  test("signDid", (done) => {
    // challengeCode = randomString(32);
    challengeCode = "Py3AnyWL1OupvuB20tyG8MaaC3FCrwoz";
    console.log({ challengeCode });
    signDid(did, { challengeCode }).then((res) => {
      expect(res).not.toBeNull();
      jws = res;
      done();
    });
  });

  test("verifyJWS", (done) => {
    verifyJWS(jws).then(({ kid, payload, id }) => {
      console.log(kid);
      console.log(payload);
      console.log(id);
      done();
    });
  });
});
