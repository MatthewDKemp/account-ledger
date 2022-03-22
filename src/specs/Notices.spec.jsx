import React from "react";
import { shallow } from "enzyme";
import { Notices } from "../components/Notices";

describe("Account Ledger Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const shallowComponent = () => shallow(<Notices />);

  it("should render Notices component", () => {
    const component = shallowComponent();
    expect(component).toMatchSnapshot();
  });
});
