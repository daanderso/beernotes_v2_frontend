import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Beer } from "../../models/Beer";
import axios from "axios";

interface BeerNoteModalProps {
  show: boolean; // Controls whether the modal is visible
  onHide: () => void; // Function to close the modal
  beer: Beer | null; // The beer object being edited
  onUpdate: (updatedBeer: Beer) => void; // Callback function to update parent state
}

function BeerNoteModal({
  show,
  onHide,
  beer,
  onUpdate,
}: BeerNoteModalProps): React.ReactElement {
  const [formData, setFormData] = useState<Beer>({
    name: "",
    style: "",
    brewery: "",
    origin: "",
    note: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Populate form data when beer changes
  useEffect(() => {
    if (beer) {
      setFormData(beer);
      setError(null); // Clear any previous errors
    }
  }, [beer, show]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidFormData = (data: Beer) => {
    return data.name && data.style && data.brewery && data.origin && data.note;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidFormData(formData)) {
      setError("All fields are required. Please fill out the entire form.");
      return;
    }

    if (!beer?.name) {
      setError("Beer name is missing. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call the backend PUT API to update the full beer object
      const response = await axios.put(
        "http://localhost:8080/api/beernotes/updateFullBeer",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Beer updated successfully", response.data);

      // Call the onUpdate callback to update parent state
      onUpdate(formData);

      // Close the modal
      onHide();
    } catch (err: unknown) {
      console.error("Error updating beer:", err);

      // Handle different error status codes from the API
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        switch (status) {
          case 404:
            setError("Beer not found. It may have been deleted.");
            break;
          case 409:
            setError("Update conflict. Multiple beers may have been affected.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          case 400:
            setError("Invalid request. Please check your input.");
            break;
          default:
            setError("Failed to update the beer. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Beer Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter beer name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Style</Form.Label>
            <Form.Control
              type="text"
              name="style"
              value={formData.style}
              onChange={handleInputChange}
              placeholder="Enter beer style"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brewery</Form.Label>
            <Form.Control
              type="text"
              name="brewery"
              value={formData.brewery}
              onChange={handleInputChange}
              placeholder="Enter brewery name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
              placeholder="Enter beer origin"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="Enter your note about this beer"
              rows={4}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BeerNoteModal;
