import { render, screen, fireEvent } from "@testing-library/react";
import ReceptionistCard from "./receptionistCard";

const mockReceptionist = {
  id: 1,
  name: "Sarah Johnson",
};

describe("ReceptionistCard", () => {
  test("renders receptionist information", () => {
    render(
      <ReceptionistCard
        selected={mockReceptionist}
        role="view"
        onDelete={jest.fn()}
      />,
    );

    expect(screen.getByText("Receptionist")).toBeInTheDocument();
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("shows delete button only in delete mode", () => {
    render(
      <ReceptionistCard
        selected={mockReceptionist}
        role="delete"
        onDelete={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /delete/i }),
    ).toBeInTheDocument();
  });

  test("calls onDelete after confirmation", () => {
    window.confirm = jest.fn(() => true);

    const onDelete = jest.fn();

    render(
      <ReceptionistCard
        selected={mockReceptionist}
        role="delete"
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test("does not call onDelete when confirmation is cancelled", () => {
    window.confirm = jest.fn(() => false);

    const onDelete = jest.fn();

    render(
      <ReceptionistCard
        selected={mockReceptionist}
        role="delete"
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onDelete).not.toHaveBeenCalled();
  });
});