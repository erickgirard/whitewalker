const { whitelist } = require("../lib/whitelist");

describe("Object Tests", () => {
  it("Filter Simple Object Given Whitelist Array", () => {
    const result = whitelist({ prop1: "b", prop2: "d" }, ["prop1"]);

    expect(result.prop1).toBe("b");
    expect(result.prop2).toBeUndefined();
  });

  it("Filter Complex Object Given Whitelist Array", () => {
    const result = whitelist(
      { prop1: "b", prop2: { prop3: "a", prop4: "b" } },
      ["prop2"]
    );

    expect(result.prop1).toBeUndefined();
    expect(result.prop2.prop3).toBe("a");
    expect(result.prop2.prop4).toBe("b");
  });

  it("Filters Complex Object Deep Given Whitelist Object", () => {
    const result = whitelist(
      { prop1: "a", prop2: { prop3: "a", prop4: "b" } },
      { prop2: ["prop3"] }
    );

    expect(result.prop1).toBeUndefined();
    expect(result.prop2.prop3).toBe("a");
    expect(result.prop2.prop4).toBeUndefined();
  });
});

describe("Array Tests", () => {
  it("Whitelists array values according to given array", () => {
    const result = whitelist([1, 2, 3], [1, 2]);

    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
    expect(result[2]).toBeUndefined();
  });
});
