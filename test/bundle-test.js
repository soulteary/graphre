// These are smoke tests to make sure the bundles look like they are working
// correctly.

var expect = require("./chai").expect;
var graphre = require('..');

describe("bundle", function() {
  it("exports graphre", function() {
    expect(graphre).to.be.an("object");
    expect(graphre.graphlib).to.be.an("object");
    expect(graphre.layout).to.be.a("function");
    expect(graphre.util).to.be.an("object");
    expect(graphre.version).to.be.a("string");
  });

  it("can do trivial layout", function() {
    var g = new graphre.Graph().setGraph({});
    g.setNode("a", { label: "a", width: 50, height: 100 });
    g.setNode("b", { label: "b", width: 50, height: 100 });
    g.setEdge("a", "b", { label: "ab", width: 50, height: 100 });

    graphre.layout(g);
    expect(g.node("a")).to.have.property("x");
    expect(g.node("a")).to.have.property("y");
    expect(g.node("a").x).to.be.gte(0);
    expect(g.node("a").y).to.be.gte(0);
    expect(g.edge("a", "b")).to.have.property("x");
    expect(g.edge("a", "b")).to.have.property("y");
    expect(g.edge("a", "b").x).to.be.gte(0);
    expect(g.edge("a", "b").y).to.be.gte(0);
  });
});
