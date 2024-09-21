import "@testing-library/jest-dom";

import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  test("renders button with children", () => {
    const childText = "Click Me";
    render(<Button>{childText}</Button>);

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  test("displays loading spinner when isLoading is true", () => {
    render(<Button isLoading={true}>Click Me</Button>);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("fires onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
