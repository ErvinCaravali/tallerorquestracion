import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from "react-bootstrap";
import './App.css';
import superstoreimg from './superstore.png';

const Show = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(false);

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
            setShowTable(true);
            setName(""); // Limpiar el campo de nombre
            setDescription(""); // Limpiar el campo de descripción
          });
      });
  }

  const handleGoToTable = () => {
    setShowForm(false);
    setShowTable(true);
  }

  const handleGoBack = () => {
    setShowForm(true);
    setShowTable(false);
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
            <Form.Label>Nombre</Form.Label> {/* Etiqueta para el campo de nombre */}
            <Form.Control 
               type="text" 
               value={name} 
               onChange={(e) => setName(e.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label> {/* Etiqueta para el campo de descripción */}
            <Form.Control 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar 
          </Button>
          <Button variant="info" onClick={handleGoToTable}>
            Ir a la tabla
          </Button>
        </Form>
      )}

      {showTable && (
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
          <div className="button-container">
            <Button variant="info" onClick={handleGoBack}>
              Volver
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Show;
