import * as React from "react";
import "@testing-library/jest-dom";
import * as renderer from 'react-test-renderer'
describe("Testing sum", () => {
  function sum(a, b) {
    return a + b;
  }

  it("should equal 4", () => {
    expect(sum(2, 2)).toBe(4);
  });
});