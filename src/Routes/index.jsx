import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/home";
import AlbumDetails from "../Componentes/Albumdetalhes";
function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<Home />}></Route>
                </Route>

                <Route path="/album/:artistName/:albumName" element={AlbumDetails}></Route>

            </Routes>
        </BrowserRouter>
    );
}
export default Rotas;