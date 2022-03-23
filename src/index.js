import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "./assets/reset.css";
import Header from "./components/header/Header";
import TelaInicial from "./components/telaInicial/TelaInicial";
import Tela2 from "./components/tela2/Tela2";
import Tela3 from "./components/tela3/Tela3";
function App(){
return(
  <BrowserRouter>
    <Header />
    <Routes>
       <Route path="/" element={<TelaInicial />} />
       <Route path="/filme/37" element={<Tela2 />} />
       <Route path="/sessao/240" element={<Tela3 />} />
    </Routes>
  </BrowserRouter>

)

}


  ReactDOM.render(<App />, document.querySelector(".root"));