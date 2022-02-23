import { possibleStatuses } from "./possibleStatuses";
import { render } from "@testing-library/react";
import { PetStatus } from "./PetStatus";

describe("Pet Status", () => {
  it('should display status "fine" if pet status is fine', () => {
    const status = possibleStatuses.fine;

    const { getByText } = render(<PetStatus status={status} />);

    const el = getByText("Status: fine");

    expect(el).toBeInTheDocument();
  });

  it('should display status "hungry" if pet is hungry', () => {
    const status = possibleStatuses.hungry;

    const { getByText } = render(<PetStatus status={status} />);

    const el = getByText("Status: hungry");

    expect(el).toBeInTheDocument();
  });

  it('should display status "sick" if pet is sick', () => {
    const status = possibleStatuses.sick;

    const { getByText } = render(<PetStatus status={status} />);

    const el = getByText("Status: sick");

    expect(el).toBeInTheDocument();
  });

  it('should display status "dead" if pet is dead', () => {
    const status = possibleStatuses.dead;

    const { getByText } = render(<PetStatus status={status} />);

    const el = getByText("Status: dead");

    expect(el).toBeInTheDocument();
  });

  it('should display status "unknown" if pet status does not match the pre-determined statuses', () => {
    const status = possibleStatuses.anything;

    const { getByText } = render(<PetStatus status={status} />);

    const el = getByText("Status: unknown");

    expect(el).toBeInTheDocument();
  });
});
