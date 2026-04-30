import { frutas } from "../DataBase/lista";
import { useState } from "react";
import "./jogo.css";
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
            if (palavra.includes(letra) && !encontrado.includes(letra)) {
                setEncontrado((prev) => {
                    const novo = [...prev, letra];
                    console.log(novo);
                    return novo;
                });
            } else if (encontrado.includes(letra)) {
                return;
            } else {
                setChance((prev) => prev - 1);
                setLetraErrada((prev) => [...prev, letra]);
            }
        }
        setLetra("");
    };

    const resetar = () => {
        setChance(3);
        setEncontrado([]);
        setLetraErrada([]);
    };

    const venceu =
        palavra &&
        palavra.split("").every((letra) => encontrado.includes(letra));

    return (
        <>
            <div className="card">
                <h3 id="chances">Chances: {chance}/3</h3>
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
                <p>
                    Letras erradas: <span id="erradas">{letraErrada}</span>
                </p>
                <input
                    type="text"
                    maxLength={1}
                    placeholder="Digite uma letra"
                    value={letra}
                    onChange={({ target }) =>
                        setLetra(target.value.toLocaleLowerCase())
                    }
                />
                {encontrado.includes(letra) && "Você já achou essa letra"}
                <button
                    onClick={() => {
                        play();
                    }}
                >
                    Tentar
                </button>
                {palavra && <p>Fruta com {palavra.length} letras</p>}
                <ul>
                    {palavra &&
                        Array.from(palavra).map((letras) => (
                            <>{encontrado.includes(letras) ? letras : "?"}</>
                        ))}
                </ul>
            </div>
            {chance < 1 && (
                <div className="card">
                    <h2 className="perdeu">Você perdeu</h2>
                    <button className="resetar" onClick={() => resetar()}>
                        Resetar
                    </button>
                </div>
            )}

            {venceu && (
                <div className="card">
                    <h2 className="ganhou">Você ganhou 🎉</h2>
                    <button className="resetar" onClick={resetar}>
                        Jogar novamente
                    </button>
                </div>
            )}
        </>
    );
}
