import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface NavbarProps {
  updateSearchTerm: (newSearchTerm: string) => void;
}

function Navbar(props: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Chame a função para atualizar a pesquisa em tempo real
    props.updateSearchTerm(newSearchTerm);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
    
          <a className="navbar-brand btn pointer">Home</a>
        
          <form className="d-flex">
            <input
              type="text"
              placeholder="Artista..."
              value={searchTerm}
              onChange={handleInputChange}
              maxLength={40}
              className="form-control me-2"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="fa fa-search fa-2x" aria-hidden="true"></i>
            </button>
          </form>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
