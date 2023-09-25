import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Chame a função para atualizar a pesquisa em tempo real
    props.updateSearchTerm(newSearchTerm);
  };

  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
    
          <a class="navbar-brand btn pointer">Home</a>
        
          <form class="d-flex">
            <input type="text"
              placeholder="Artista..."
              value={searchTerm}
              onChange={handleInputChange}
              maxLength={40} class="form-control me-2" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit"><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
          </form>
          
        </div>
      </nav>


    </>
  );
}

export default Navbar;
