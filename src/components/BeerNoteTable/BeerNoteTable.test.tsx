import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BeerNoteTable from "./BeerNoteTable";
import { Beer } from "../../models/Beer";

vi.mock("../BeerNoteModal/beerNoteModal", () => ({
  default: () => null,
}));

const sampleBeer: Beer = {
  name: "Test Lager",
  style: "Lager",
  brewery: "Test Brewery",
  origin: "USA",
  note: "Crisp and clean",
  rating: 4,
};

describe("BeerNoteTable", () => {
  it("renders Rating column header after Note", () => {
    render(
      <BeerNoteTable
        beerNotes={[]}
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
      />,
    );

    const headers = screen.getAllByRole("columnheader");
    const noteIndex = headers.findIndex((h) => h.textContent === "Note");
    const ratingIndex = headers.findIndex((h) => h.textContent === "Rating");
    expect(ratingIndex).toBe(noteIndex + 1);
  });

  it("displays star rating for beer with rating", () => {
    render(
      <BeerNoteTable
        beerNotes={[sampleBeer]}
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("radiogroup", { name: "Rating: 4 out of 5" }),
    ).toBeInTheDocument();
  });

  it("shows em dash when beer has no rating", () => {
    const beerWithoutRating: Beer = { ...sampleBeer, rating: null };
    render(
      <BeerNoteTable
        beerNotes={[beerWithoutRating]}
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
      />,
    );

    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
