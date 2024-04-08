import { useState, useEffect } from 'react';
import { Form, Button, Table } from "react-bootstrap";
import './App.css';
import superstoreimg from './superstore.png';

export const App = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:4000/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar petición POST con los campos "name" y "description"
    fetch("http://localhost:4000/categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchCategories(); // Actualizar la lista después de agregar una categoría
      });
  };

  return (
    <div className="App">
      <img src={superstoreimg} alt="Super Store" className="imagen" />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send 
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td>
              <td>{category.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Codigo Javier Lasso