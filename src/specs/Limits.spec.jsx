import React from "react";
import { shallow } from "enzyme";
import { Limits } from "../components/Limits";

describe("Account Ledger Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const shallowComponent = () => shallow(<Limits />);

  it("should render Limits component", () => {
    const component = shallowComponent();
    expect(component).toMatchSnapshot();
  });
});
