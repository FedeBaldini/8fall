import { render } from "@testing-library/react";

import { MenuItem } from "../MenuItem";

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

describe("components / Layout / MainMenu / MenuItem", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.resetAllMocks);

  it("has active class when the current pathname is exactly the href", () => {
    mockPathname = "/exact-path";

    const { container } = render(
      <>
        <MenuItem exact href="/exact-path" text="First" />
        <MenuItem exact href="/exact" text="Second" />
      </>
    );

    const active = container.querySelectorAll(".active");

    expect(active).toHaveLength(1);
    expect(active[0]).toContainHTML("First");
  });

  it("has active class when the current pathname starts with the href", () => {
    mockPathname = "/path/that/starts/the/same";

    const { container } = render(
      <>
        <MenuItem href="/path" text="First" />
        <MenuItem href="/different/path" text="Second" />
      </>
    );

    const active = container.querySelectorAll(".active");

    expect(active).toHaveLength(1);
    expect(active[0]).toContainHTML("First");
  });
});
