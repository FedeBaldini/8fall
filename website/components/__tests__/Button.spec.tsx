import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "../Button";

describe("components / Button", () => {
  it("allows to provide additional class names", () => {
    const { container } = render(
      <Button onClick={jest.fn()} className="additional-class">
        Click
      </Button>
    );

    expect(container.querySelector(".additional-class")).toBeInTheDocument();
  });

  it.each<["primary" | "secondary", string]>([
    ["primary", "bg-sky-600"],
    ["secondary", "bg-pink-600"],
  ])("renders with %s style", (style, className) => {
    const { container } = render(
      <Button onClick={jest.fn()} style={style}>
        Click
      </Button>
    );

    expect(container.querySelector(`.${className}`)).toBeInTheDocument();
  });

  it.each<["primary" | "secondary", string]>([
    ["primary", "border-sky-600"],
    ["secondary", "border-pink-600"],
  ])("renders transparent with %s style", (style, className) => {
    const { container } = render(
      <Button onClick={jest.fn()} style={style} transparent>
        Click
      </Button>
    );

    expect(container.querySelector(`.${className}`)).toBeInTheDocument();
    expect(container.querySelector(".bg-transparent")).toBeInTheDocument();
  });

  it("handles the click", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);

    fireEvent.click(screen.getByText("Click"));

    expect(onClick).toHaveBeenCalled();
  });
});
