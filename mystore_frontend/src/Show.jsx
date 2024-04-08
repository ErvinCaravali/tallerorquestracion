import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from "react-bootstrap";
import './App.css';
import superstoreimg from './superstore.png';

const Show = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/categories/")
      .then((response) => response.json())
      .then((data) => setTableData(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch("http://localhost:4000/categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch("http://localhost:4000/categories/")
          .then((response) => response.json())
          .then((data) => {
            setTableData(data);
            setShowForm(false);
            setName(""); // Limpiar el campo de nombre
            setDescription(""); // Limpiar el campo de descripción
          });
      });
  }

  return (
    <div className="container">
      <div className="header">
        <img src={superstoreimg} alt="Super Store" className="logo" />
        <h1>Super Store</h1>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
               type="text" 
               value={name} 
               onChange={(e) => setName(e.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar 
          </Button>
        </Form>
      )}

      {tableData.length > 0 && (
        <div>
          <h2 className="table-heading">Tabla de Categorías</h2>
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default Show;