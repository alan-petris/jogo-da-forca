import { frutas } from "../DataBase/lista";
import { useState } from "react";
//gerarNumAleatorio(0, frutas.length - 1) Gera um num entre 0 e o tamanho da lista
export default function Jogo() {
    const [letra, setLetra] = useState<string>("");
    const [palavra, setPalavra] = useState<string>("");
    const [encontrado, setEncontrado] = useState<string>("??");
    const [chance, setChance] = useState<number>(3);
    const gerarNumAleatorio = (x: number, y: number) =>
        Math.floor(Math.random() * (y - x + 1)) + x;
    return (
        <>
            <h3>Chances: {chance}</h3>
            <button
                onClick={() =>
                    setPalavra(frutas[gerarNumAleatorio(0, frutas.length - 1)])
                }
            >
                Play
            </button>
            <p>Palavra escolhida: {palavra}</p>
            <input
                type="text"
                value={letra}
                onChange={({ target }) => setLetra(target.value)}
            />
            <p>
                Existe letra {letra} em palavra: {palavra} ?
            </p>
            <p>{palavra.includes(letra) ? "Sim" : "Não"}</p>
            <ul>
                {palavra &&
                    Array.from(palavra).map((letras, index) => (
                        <li>{index > 2 ? palavra.charAt(index) : "?"}</li>
                    ))}
            </ul>
            <p>Verificar index da letra "a": {palavra.indexOf("a")}</p>
        </>
    );
}
