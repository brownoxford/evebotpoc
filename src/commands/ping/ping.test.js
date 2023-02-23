const ping = require("./ping.js");
const chai = require("chai");
const sinon = require("sinon");

const assert = chai.assert;
const expect = chai.expect;

describe("slashcommand 'ping'", function () {
  it("should reply 'Pong!'", async function () {
    const spy = sinon.spy();
    const interaction = { reply: spy };

    await ping.execute(interaction);

    assert(spy.calledOnce, `expected 1 call, got ${spy.callCount}`);
    expect(spy.firstCall.args).to.deep.equal(["Pong!"]);
  });
});
