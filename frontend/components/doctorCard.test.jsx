import { render, screen, fireEvent } from "@testing-library/react";
import DoctorCard from "./doctorCard";

const mockDoctor = {
  id: 1,
  name: "John Smith",
  specialization: "Cardiology",
};

describe("DoctorCard", () => {
  test("renders doctor information", () => {
    render(
      <DoctorCard
        selected={mockDoctor}
        role="book"
        onDelete={jest.fn()}
        onBook={jest.fn()}
      />,
    );

    expect(screen.getByText("Doctor")).toBeInTheDocument();
    expect(screen.getByText(/ID:/)).toBeInTheDocument();
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Specialization:/)).toBeInTheDocument();

    expect(screen.getByText("Dr. John Smith")).toBeInTheDocument();
    expect(screen.getByText("Cardiology")).toBeInTheDocument();
  });

  test("shows delete button only when role is delete", () => {
    render(
      <DoctorCard
        selected={mockDoctor}
        role="delete"
        onDelete={jest.fn()}
        onBook={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /book appointment/i }),
    ).not.toBeInTheDocument();
  });

  test("shows book button only when role is book", () => {
    render(
      <DoctorCard
        selected={mockDoctor}
        role="book"
        onDelete={jest.fn()}
        onBook={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /book appointment/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /delete/i }),
    ).not.toBeInTheDocument();
  });

  test("calls onBook with doctor id", () => {
    const onBook = jest.fn();

    render(
      <DoctorCard
        selected={mockDoctor}
        role="book"
        onDelete={jest.fn()}
        onBook={onBook}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /book appointment/i }));

    expect(onBook).toHaveBeenCalledWith(1);
  });

  test("calls onDelete after confirmation", () => {
    window.confirm = jest.fn(() => true);

    const onDelete = jest.fn();

    render(
      <DoctorCard
        selected={mockDoctor}
        role="delete"
        onDelete={onDelete}
        onBook={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test("does not delete when confirmation is cancelled", () => {
    window.confirm = jest.fn(() => false);

    const onDelete = jest.fn();

    render(
      <DoctorCard
        selected={mockDoctor}
        role="delete"
        onDelete={onDelete}
        onBook={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onDelete).not.toHaveBeenCalled();
  });
});
