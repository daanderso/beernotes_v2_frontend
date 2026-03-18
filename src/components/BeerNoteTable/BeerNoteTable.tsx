import React from "react";
import { Table, Button } from "react-bootstrap";
import { Beer } from "../../models/Beer";
import styles from "./BeerNoteTable.module.css";

interface BeerNoteTableProps {
  beerNotes: Beer[]; // Array of beer notes passed as a prop
}
function BeerNoteTable({ beerNotes }: BeerNoteTableProps): React.ReactElement {
  // Function to render the beer notes in a table format
  // The beerNotes prop is an array of Beer objects, which are displayed in the table rows
  // Each row contains the beer's name, style, brewery, origin, and note
  // The index is used to generate a unique key for each row
  // The table is styled with Bootstrap classes for a clean and responsive design
  return (
    <div className={styles.table}>
      <Table className="w-auto" striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Style</th>
            <th>Brewery</th>
            <th>Origin</th>
            <th>Note</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {beerNotes.map((Beer, index) => (
            <tr key={`${Beer.name}-${index}`}>
              <td>{index + 1}</td>
              <td>{Beer.name}</td>
              <td>{Beer.style}</td>
              <td>{Beer.brewery}</td>
              <td>{Beer.origin}</td>
              <td>{Beer.note}</td>
              <td>
                <Button variant="primary" type="button">
                  Update
                </Button>
              </td>
              <td>
                <Button variant="primary" type="button">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BeerNoteTable;
