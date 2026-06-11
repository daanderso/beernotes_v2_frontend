import { useState, useEffect } from "react";
import styles from "./App.module.css";
import BeerCapButtonForm from "./components/BeerCapButtonForm/BeerCapButtonForm";
import "bootstrap/dist/css/bootstrap.min.css";
import BeerNoteTable from "./components/BeerNoteTable/BeerNoteTable";
import { Beer } from "./models/Beer";
import axios from "axios";

function App() {
  const [beerNotes, setBeerNotes] = useState<Beer[]>([]); // Shared state for beer notes

  // Fetch beer notes from the backend when the app renders
  useEffect(() => {
    async function fetchBeerNotes() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/beernotes/beerlist",
        );
        setBeerNotes(response.data); // Update the state with the fetched beer notes
      } catch (error) {
        console.error("Error fetching beer notes:", error);
      }
    }

    fetchBeerNotes(); //this triggers the API call to fetch beer notes when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to add a new beer note to the list.  The addBeerNote function is passed to the BeerCapButtonForm component
  // and is called when the form is submitted.
  // It (is a shared state) that updates the beerNotes state with the new beer note.
  const addBeerNote = (newBeerNote: Beer) => {
    setBeerNotes((prevNotes) => [...prevNotes, newBeerNote]);
  };

  const handleDeleteBeer = async (beerName: string) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/beernotes/deleteBeer/${beerName}`,
      );
      //filters previous state keeping only beers that do not match the deleted beer name and updates the state with the filtered list, effectively removing the deleted beer note from the UI.
      setBeerNotes((prevNotes) =>
        prevNotes.filter((beer) => beer.name !== beerName), 
      );
    } catch (error) {
      console.error("Error deleting beer:", error);
    }
  };

  // Function to handle updating a beer note
  const handleUpdateBeerNote = (updatedBeer: Beer, oldBeerName: string) => {
    // Update the beer notes state with the updated beer
    setBeerNotes((prevNotes) =>
      prevNotes.map((beer) => (beer.name === oldBeerName ? updatedBeer : beer)),
    );
  };

  return (
    <div className={styles["beernotes-background"]}>
      <header className="header">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <h1 className={styles["header-title"]}>BeerNotes</h1>
          <p className={styles["header-subtitle"]}>
            A Personal Journey of Global Beer Tastings
          </p>
        </div>
      </header>
      <div className="app-container">
        <br></br>
        {/* Pass the addBeerNote function as a prop */}
        <BeerCapButtonForm addBeerNote={addBeerNote} />
        <br></br>
      </div>
      {/* Pass the beerNotes state, onDelete function, and onUpdate function as props */}
      <div>
        <BeerNoteTable
          beerNotes={beerNotes}
          onDelete={handleDeleteBeer}
          onUpdate={handleUpdateBeerNote}
        />
      </div>
    </div>
  );
}

export default App;
