import React, { useState, useEffect } from 'react'
import './Categories.css';

export const Categories = () => {
   
  const [data, setData] = useState([]);

  useEffect(() => {
    // Función para realizar la llamada a la API
    const fetchData = async () => {
      try {
        // Realizar la llamada a la API
        const response = await fetch("http://localhost:4000/categories/");
        const jsonData = await response.json();

        // Almacenar los datos en el estado
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    // Llamar a la función para obtener los datos cuando el componente se monte
    fetchData();
  }, []);

  return (
    <div>
        <h1>Categories</h1>
        <table className='customTable'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}
