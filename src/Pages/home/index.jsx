import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Componentes/Navbar";
import LastFmAlbums from "../../Componentes/Top_albuns";
import Footer from "../../Componentes/Footer";
// import Main from "../../Componentes/Main";
import styled from "styled-components";
import TopBrazilianAlbums from "../../Componentes/GlobalTopAlbums";

const Main = styled.div`
    background-color: #2125295f;

    height: 77.5vh;
    overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: #888;
        }

    
`


function Home() {
    const [searchTerm, setSearchTerm] = useState("");
  
    const updateSearchTerm = (term) => {
      setSearchTerm(term);
    };
  
    return (
      <>
        <Navbar updateSearchTerm={updateSearchTerm} />
        <Main>
          {searchTerm === "" ? <TopBrazilianAlbums /> : <LastFmAlbums searchTerm={searchTerm} />}
        </Main>
        <Footer />
      </>
    );
  }
  



export default Home;