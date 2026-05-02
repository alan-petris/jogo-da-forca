import { useState } from "react";
import "./App.css";
import Jogo from "./components/Jogo";
import Categorias from "./components/Categorias";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Categorias />
            <Jogo />
        </>
    );
}

export default App;
