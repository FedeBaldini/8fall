import { render, screen } from "@testing-library/react";

import { LinkWithIcon } from "../LinkWithIcon";

describe("components / Layout / LinkWithIcon", () => {
  it.each([
    ["the same context", "internal", "/inner/page", "_self"],
    ["a new tab/window", "external", "http://www.google.it", "_blank"],
    ["a new tab/window", "external", "https://www.apple.it", "_blank"],
  ])("targets %s when the href is an %s link", (_, __, href, target) => {
    const { container } = render(<LinkWithIcon href={href} icon="Facebook" />);

    const link = container.querySelector("a");

    expect(link).toHaveAttribute("target", target);
  });

  it("renders with text when provided", () => {
    render(<LinkWithIcon href="/" icon="Facebook" text="Home" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("allows to provide additional class names", () => {
    const { container } = render(
      <LinkWithIcon href="/" icon="Facebook" className="home-page" />
    );

    const link = container.querySelector("a");

    expect(link).toHaveClass("home-page");
  });
});
