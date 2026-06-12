import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Beer } from "../../models/Beer";
import styles from "./BeerNoteTable.module.css";
import TableButton from "../TableButton/TableButton";
import BeerNoteModal from "../BeerNoteModal/beerNoteModal";
import StarRating from "../StarRating/StarRating";

interface BeerNoteTableProps {
  beerNotes: Beer[]; // Array of beer notes passed as a prop
  onDelete: (beerName: string) => void; // function passed as a prop to handle deletion of a beer note
  onUpdate: (updatedBeer: Beer, oldBeerName: string) => void; // function to handle updating a beer note
}

function BeerNoteTable({
  beerNotes,
  onDelete,
  onUpdate,
}: BeerNoteTableProps): React.ReactElement {
  const [showModal, setShowModal] = useState(false);
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);

  // Handler to open the modal and set the selected beer
  const handleUpdateClick = (beer: Beer) => {
    setSelectedBeer(beer);
    setShowModal(true);
  };

  // Handler when modal is closed
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBeer(null);
  };

  // Handler when the update is confirmed in the modal
  const handleModalUpdate = (updatedBeer: Beer) => {
    if (selectedBeer) {
      onUpdate(updatedBeer, selectedBeer.name);
    }
  };

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
            <th>Rating</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {beerNotes.map((beer, index) => (
            <tr key={`${beer.name}-${index}`}>
              <td>{index + 1}</td>
              <td>{beer.name}</td>
              <td>{beer.style}</td>
              <td>{beer.brewery}</td>
              <td>{beer.origin}</td>
              <td>{beer.note}</td>
              <td>
                <StarRating value={beer.rating} readOnly />
              </td>
              <td>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => handleUpdateClick(beer)}
                >
                  Update
                </Button>
              </td>
              <td>
                <TableButton onClick={() => onDelete(beer.name)}>
                  Delete
                </TableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* BeerNoteModal for editing beer notes */}
      <BeerNoteModal
        show={showModal}
        onHide={handleCloseModal}
        beer={selectedBeer}
        onUpdate={handleModalUpdate}
      />
    </div>
  );
}

export default BeerNoteTable;
