import React from "react";
import { shallow } from "enzyme";
import { AccountLedger } from "../components/AccountLedger";

describe("Account Ledger Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const shallowComponent = () => shallow(<AccountLedger />);

  it("should render Counter component", () => {
    const component = shallowComponent();
    expect(component).toMatchSnapshot();
  });
});
