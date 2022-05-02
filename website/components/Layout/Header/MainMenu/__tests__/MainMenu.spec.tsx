import { render } from "@testing-library/react";

import { MainMenu } from "../MainMenu";

let mockPathname = "";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: mockPathname,
      query: "",
      asPath: "",
    };
  },
}));

describe("components / Layout / MainMenu", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it.each([
    ["open", true],
    ["closed", false],
  ])("renders the class '%s' when isOpen: %s", (className, isOpen) => {
    mockPathname = "/some-path";

    const { container } = render(<MainMenu isOpen={isOpen} />);
    expect(container.querySelector("nav")).toHaveClass(className);
  });
});
