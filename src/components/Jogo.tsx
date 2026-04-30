import { frutas } from "../DataBase/lista";
import { useState } from "react";
//gerarNumAleatorio(0, frutas.length - 1) Gera um num entre 0 e o tamanho da lista
export default function Jogo() {
    const [letra, setLetra] = useState<string>("");
    const [palavra, setPalavra] = useState<string>("");
    const [encontrado, setEncontrado] = useState<string[]>([]);
    const [chance, setChance] = useState<number>(3);
    const [letraErrada, setLetraErrada] = useState<string[]>([]);
    const gerarNumAleatorio = (x: number, y: number) =>
        Math.floor(Math.random() * (y - x + 1)) + x;

    const play = () => {
        if (!letra) return;
        if (chance > 0) {
            if (palavra.includes(letra)) {
                setEncontrado((prev) => {
                    const novo = [...prev, letra];
                    console.log(novo);
                    return novo;
                });
            } else {
                setChance((prev) => prev - 1);
                setLetraErrada((prev) => [...prev, letra]);
            }
        }
        setLetra("");
    };

    return (
        <>
            <h3>Chances: {chance}</h3>
            <button
                onClick={() =>
                    setPalavra(
                        frutas[
                            gerarNumAleatorio(0, frutas.length - 1)
                        ].toLocaleLowerCase(),
                    )
                }
            >
                Mudar fruta
            </button>
            <p>Palavra escolhida: {palavra}</p>
            <p>Letras escolhidas: {letraErrada}</p>
            <input
                type="text"
                maxLength={1}
                placeholder="Digite uma letra"
                value={letra}
                onChange={({ target }) =>
                    setLetra(target.value.toLocaleLowerCase())
                }
            />
            <button
                onClick={() => {
                    play();
                }}
            >
                Tentar
            </button>
            <p>
                Existe letra {letra} em palavra: {palavra} ?
            </p>
            <p>{palavra.includes(letra) ? "Sim" : "Não"}</p>
            <ul>
                {palavra &&
                    Array.from(palavra).map((letras) => (
                        <li>{encontrado.includes(letras) ? letras : "?"}</li>
                    ))}
            </ul>
        </>
    );
}
