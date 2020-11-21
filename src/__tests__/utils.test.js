const { createDid, signDid, verifyJWS } = require("../utils");

let did = null;
let jws = null;

describe("Utils", () => {
  beforeAll(() => {});

  test("createDid", (done) => {
    createDid().then((res) => {
      did = res;
      expect(/did:key:[a-zA-Z0-9]{48}/.test(did.id)).toBe(true);
      done();
    });
  });

  test("signDid", (done) => {
    signDid(did, { hello: "world" }).then((res) => {
      expect(res).not.toBeNull();
      jws = res;
      done();
    });
  });

  test("verifyJWS", (done) => {
    verifyJWS(jws).then(() => {
      done();
    });
  });
});
