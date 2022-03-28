import { possibleStatuses } from "./possibleStatuses";
import { render, screen } from "@testing-library/react";
import { PetStatus } from "./PetStatus";

describe("Pet Status", () => {
  it('should display status "fine" if pet status is fine', () => {
    const status = possibleStatuses.fine;

    render(<PetStatus status={status} />);

    const el = screen.getByText("Status: fine");

    expect(el).toBeInTheDocument();
  });

  it('should display status "hungry" if pet is hungry', () => {
    const status = possibleStatuses.hungry;

    render(<PetStatus status={status} />);

    const el = screen.getByText("Status: hungry");

    expect(el).toBeInTheDocument();
  });

  it('should display status "sick" if pet is sick', () => {
    const status = possibleStatuses.sick;

    render(<PetStatus status={status} />);

    const el = screen.getByText("Status: sick");

    expect(el).toBeInTheDocument();
  });

  it('should display status "dead" if pet is dead', () => {
    const status = possibleStatuses.dead;

    render(<PetStatus status={status} />);

    const el = screen.getByText("Status: dead");

    expect(el).toBeInTheDocument();
  });

  it('should display status "unknown" if pet status does not match the pre-determined statuses', () => {
    const status = possibleStatuses.anything;

    render(<PetStatus status={status} />);

    const el = screen.getByText("Status: unknown");

    expect(el).toBeInTheDocument();
  });
});
