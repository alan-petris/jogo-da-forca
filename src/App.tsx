import { useState } from "react";
import "./App.css";
import Jogo from "./components/Jogo";
import Teste from "./components/Teste";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Jogo da forca</h1>
            <Jogo />
            <Teste titulo="Alo">
                <p>Add haha</p>
                <h3>Mais um</h3>
            </Teste>
        </>
    );
}

export default App;
