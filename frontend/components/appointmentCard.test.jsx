import { render, screen, fireEvent } from "@testing-library/react";
import AppointmentCard from "./appointmentCard";

const appointment = {
  appointmentID: 1001,
  patientName: "John Smith",
  patientID: 123456,
  doctorName: "Ahmed",
  doctorID: 111111,
  appointmentDate: "2026-07-23",
  appointmentTime: {
    from: "10:00",
    to: "10:30",
  },
  status: "Booked",
};

describe("AppointmentCard", () => {
  test("renders appointment information", () => {
    render(
      <AppointmentCard
        selected={appointment}
        role="view"
        onCancel={() => {}}
        onComplete={() => {}}
      />
    );

    expect(screen.getByText("Appointment")).toBeInTheDocument();
    expect(screen.getByText(/John Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Ahmed/)).toBeInTheDocument();
    expect(screen.getByText(/Booked/)).toBeInTheDocument();
  });

  test("shows cancel button for booked appointment", () => {
    render(
      <AppointmentCard
        selected={appointment}
        role="cancel"
        onCancel={() => {}}
        onComplete={() => {}}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /Cancel Appointment/i,
      })
    ).toBeInTheDocument();
  });

  test("shows complete button", () => {
    render(
      <AppointmentCard
        selected={appointment}
        role="completed"
        onCancel={() => {}}
        onComplete={() => {}}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /Mark as Completed/i,
      })
    ).toBeInTheDocument();
  });

  test("history only shows completed appointments", () => {
    render(
      <AppointmentCard
        selected={appointment}
        role="history"
        onCancel={() => {}}
        onComplete={() => {}}
      />
    );

    expect(screen.queryByText("Appointment")).not.toBeInTheDocument();
  });

  test("calls onCancel after confirmation", () => {
    window.confirm = jest.fn(() => true);

    const onCancel = jest.fn();

    render(
      <AppointmentCard
        selected={appointment}
        role="cancel"
        onCancel={onCancel}
        onComplete={() => {}}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Cancel Appointment/i,
      })
    );

    expect(onCancel).toHaveBeenCalledWith(1001);
  });
});