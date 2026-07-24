import { render, screen, fireEvent } from "@testing-library/react";
import PatientCard from "./patientCard";

const mockPatient = {
  id: 1,
  name: "Alice",
  age: 22,
  gender: "Female",
  medicalHistory: ["Diabetes", "Asthma"],
};

describe("PatientCard", () => {
  test("renders patient information", () => {
    render(
      <PatientCard
        selected={mockPatient}
        role="book"
        onDelete={jest.fn()}
        onSelect={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(screen.getByText("Patient")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("22")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();

    expect(screen.getByText("Diabetes")).toBeInTheDocument();
    expect(screen.getByText("Asthma")).toBeInTheDocument();
  });

  test("shows placeholder when no medical history exists", () => {
    render(
      <PatientCard
        selected={{ ...mockPatient, medicalHistory: [] }}
        role="book"
        onDelete={jest.fn()}
        onSelect={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(
      screen.getByText(/No medical history available/i),
    ).toBeInTheDocument();
  });

  test("shows delete button only in delete mode", () => {
    render(
      <PatientCard
        selected={mockPatient}
        role="delete"
        onDelete={jest.fn()}
        onSelect={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /^delete$/i }),
    ).toBeInTheDocument();
  });

  test("calls onDelete after confirmation", () => {
    window.confirm = jest.fn(() => true);

    const onDelete = jest.fn();

    render(
      <PatientCard
        selected={mockPatient}
        role="delete"
        onDelete={onDelete}
        onSelect={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /^delete$/i }));

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test("calls onSelect when booking", () => {
    const onSelect = jest.fn();

    render(
      <PatientCard
        selected={mockPatient}
        role="book"
        onDelete={jest.fn()}
        onSelect={onSelect}
        onSave={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /select patient/i }));

    expect(onSelect).toHaveBeenCalledWith(1);
  });

  test("adds new medical history", () => {
    render(
      <PatientCard
        selected={mockPatient}
        role="edit"
        onDelete={jest.fn()}
        onSelect={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/add medical history/i), {
      target: { value: "Allergy" },
    });

    fireEvent.click(screen.getByRole("button", { name: /^add$/i }));

    expect(screen.getByText("Allergy")).toBeInTheDocument();
  });

  test("removes medical history item", () => {
    render(
      <PatientCard
        selected={mockPatient}
        role="edit"
        onDelete={jest.fn()}
        onSelect={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    fireEvent.click(screen.getAllByRole("button", { name: /remove/i })[0]);

    expect(screen.queryByText("Diabetes")).not.toBeInTheDocument();
  });

  test("saves updated medical history", () => {
    const onSave = jest.fn();

    render(
      <PatientCard
        selected={mockPatient}
        role="edit"
        onDelete={jest.fn()}
        onSelect={jest.fn()}
        onSave={onSave}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    expect(onSave).toHaveBeenCalledWith(1, ["Diabetes", "Asthma"]);
  });
});
