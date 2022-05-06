import { fireEvent, render, screen } from "@testing-library/react";

import { NumberField } from "../NumberField";

describe("components / NumberField", () => {
  it("allows to provide additional class names", () => {
    const { container } = render(
      <NumberField onChange={jest.fn()} className="additional-class" />
    );

    expect(container.querySelector(".additional-class")).toBeInTheDocument();
  });

  it("renders with initial value when provided", () => {
    render(<NumberField onChange={jest.fn()} initialValue={3} />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("changes the value", () => {
    const onChange = jest.fn();
    render(<NumberField onChange={onChange} initialValue={3} />);

    fireEvent.click(screen.getByTestId("Decrement"));
    expect(onChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByTestId("Increment"));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
