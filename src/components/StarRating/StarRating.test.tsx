import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import StarRating from "./StarRating";

describe("StarRating", () => {
  it("renders five interactive stars when not read-only", () => {
    render(<StarRating onChange={vi.fn()} />);
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });

  it("calls onChange with star value when a star is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "Rate 3 stars" }));

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("clears rating when the same star is clicked again", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating value={3} onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "Rate 3 stars" }));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("does not call onChange in read-only mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating value={4} readOnly onChange={onChange} />);

    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
    expect(screen.getAllByText("★")).toHaveLength(5);

    const stars = screen.getAllByText("★");
    await user.click(stars[0]);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("shows em dash when read-only and rating is missing", () => {
    render(<StarRating readOnly />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("shows filled stars for read-only rating value", () => {
    render(<StarRating value={4} readOnly />);
    expect(
      screen.getByRole("radiogroup", { name: "Rating: 4 out of 5" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("★")).toHaveLength(5);
  });
});
