import { useState } from "react";
import "./App.css";
import Jogo from "./components/Jogo";
import Teste from "./components/Teste";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Jogo />
        </>
    );
}

export default App;
