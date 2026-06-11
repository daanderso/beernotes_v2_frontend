import React, { useState, useEffect, useRef } from "react";
import { Button, Collapse, Image, Container, Form } from "react-bootstrap";
import styles from "./BeerCapButtonForm.module.css"; // Import CSS module for styling
import bottlecap from "../../assets/images/bottlecap-gold.png";
import { Beer } from "../../models/Beer";
import StarRating from "../StarRating/StarRating";
import axios from "axios";

interface BeerCapButtonFormProps {
  addBeerNote: (newBeerNote: Beer) => void; // Function to add a new beer note
}

function BeerCapButtonForm({
  addBeerNote,
}: BeerCapButtonFormProps): React.ReactElement {
  const initializeFormData: Beer = {
    name: "",
    style: "",
    brewery: "",
    origin: "",
    note: "",
    rating: null,
  };

  // Usestate hooks to manage the state of the form and its data
  const [open, setOpen] = useState(false);
  const [beerFormData, setBeerFormData] = useState<Beer>(initializeFormData);
  const [formError, setFormError] = useState<string | null>(null);

  function isValidFormData(formData: Beer) {
    return (
      formData.name &&
      formData.style &&
      formData.brewery &&
      formData.origin &&
      formData.note
    );
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidFormData(beerFormData)) {
      setFormError("All fields are required. Please fill out the entire form.");
      console.log("Beer Form Data:", beerFormData);
      return; // Stop form submission
    }

    setFormError(null); // Clear any previous error messages
    console.log("Beer Form Data:", beerFormData); // Log the beer data to the console
    console.log("Form submitted!");

    //POST berFormData to backend API endpoint
    axios
      .post("http://localhost:8080/api/beernotes/saveBeer", beerFormData, {
        headers: {
          "Content-Type": "application/json", // Explicitly set the Content-Type header
        },
      })
      .then((response) => {
        console.log("Beer note saved successfully", response.data);

        // Add the new beer note to the shared state (use server response for id and rating)
        addBeerNote(response.data);

        // Reset the form data to the initial state
        setBeerFormData(initializeFormData);
      })
      .catch((error) => {
        console.error("Error saving beer note:", error);

        // Optionally, display an error message to the user
        setFormError("Failed to save the beer note. Please try again.");
      });
  }

  //Beer Cap Button Click Handler - Toggles the form
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play audio only when form opens
  useEffect(() => {
    if (open && audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play();
    }
  }, [open]);

  function handleBeerCapClick() {
    // Toggle the form
    setOpen(!open);
  }

  return (
    <div>
      {/* Audio for the bottlecap button */}
      <audio ref={audioRef} src="/sounds/open-bottle.mp3"></audio>

      {/* Container for the bottlecap button */}
      <Container id="new-note-btn-container" className="text-center">
        <div id="new-note-btn" className="button-container">
          <Button
            id="beer-note-btn"
            onClick={handleBeerCapClick}
            aria-controls="beerForm"
            aria-expanded={open}
            style={{
              backgroundColor: "transparent", // Directly set the background color
              borderColor: "transparent",
            }}
            //className={`${styles["beer-cap-button"]} ${styles["btn-primary"]}`}
            className={styles["beer-cap-button"]}
          >
            <Image
              src={bottlecap}
              alt="Enter a New BeerNote"
              className={styles["bottle-btn"]}
              fluid
            />
          </Button>
        </div>

        {/* Collapse transition wrapping the form */}
        <Collapse in={open}>
          <div id="beerForm">
            <br></br>
            <Form
              className="beerForm"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission behavior
                handleFormSubmit(e); // Call form submission handler on submit
              }}
            >
              <div className="form-group" data-bs-theme="light">
                <Form.Group
                  className="mb-3"
                  id="beer-name-id"
                  controlId="beerName"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Beer Name"
                    value={beerFormData.name}
                    onChange={(e) =>
                      setBeerFormData({ ...beerFormData, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  id="beer-style-id"
                  controlId="beerStyle"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Beer Style "
                    value={beerFormData.style}
                    onChange={(e) =>
                      setBeerFormData({
                        ...beerFormData,
                        style: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  id="beer-brewery-id"
                  controlId="beerBrewery"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Beer Brewery "
                    value={beerFormData.brewery}
                    onChange={(e) =>
                      setBeerFormData({
                        ...beerFormData,
                        brewery: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  id="origin-select-id"
                  controlId="beerOrigin"
                >
                  <Form.Select
                    aria-label="Default select"
                    value={beerFormData.origin} // Bind the selected value to state
                    onChange={(e) =>
                      setBeerFormData({
                        ...beerFormData,
                        origin: e.target.value,
                      })
                    }
                  >
                    <option>Select Country of Origin</option>
                    <option value="USA">USA</option>
                    <option value="Australia">Australia</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Canada">Canada</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="China">China</option>
                    <option value="England">England</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Poland">Poland</option>
                    <option value="Scotland">Scotland</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  id="beer-note-group"
                  controlId="beerForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Beer Note"
                    type="text"
                    value={beerFormData.note}
                    onChange={(e) =>
                      setBeerFormData({ ...beerFormData, note: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="beerRating">
                  <Form.Label>Rating (optional)</Form.Label>
                  <div>
                    <StarRating
                      value={beerFormData.rating}
                      onChange={(rating) =>
                        setBeerFormData({ ...beerFormData, rating })
                      }
                    />
                  </div>
                </Form.Group>
              </div>

              {/* Display error message if any field is empty */}
              {formError && <p className="text-danger">{formError}</p>}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Collapse>
      </Container>
    </div>
  );
}

export default BeerCapButtonForm;
