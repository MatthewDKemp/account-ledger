import React from "react";
import { shallow } from "enzyme";
import { BalanceTable } from "../components/BalanceTable";

describe("Account Ledger Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const shallowComponent = () => shallow(<BalanceTable />);

  it("should render BalanceTable component", () => {
    const component = shallowComponent();
    expect(component).toMatchSnapshot();
  });
});
