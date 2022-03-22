import React from "react";
import { shallow } from "enzyme";
import { Transactions } from "../components/Transactions";

describe("Account Ledger Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const shallowComponent = () => shallow(<Transactions />);

  it("should render Transactions component", () => {
    const component = shallowComponent();
    expect(component).toMatchSnapshot();
  });
});
