import { frutas } from "../DataBase/lista";
import { useState, useRef, useEffect } from "react";
import "./jogo.css";
export default function Jogo() {
    const [letra, setLetra] = useState<string>("");
    const [palavra, setPalavra] = useState<string>("");
    const [encontrado, setEncontrado] = useState<string[]>([]);
    const [chance, setChance] = useState<number>(3);
    const [letraErrada, setLetraErrada] = useState<string[]>([]);
    const [disable, setDisable] = useState<boolean>(false);
    const inputLetra = useRef<HTMLInputElement>(null);
    const gerarNumAleatorio = (x: number, y: number) =>
        Math.floor(Math.random() * (y - x + 1)) + x;

    useEffect(() => {
        setPalavra(
            frutas[gerarNumAleatorio(0, frutas.length - 1)].toLowerCase(),
        );
    }, []);

    const play = () => {
        if (!letra || chance <= 0 || venceu) return;
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
        inputLetra.current?.focus();
    };

    const mudarFruta = () => {
        setPalavra(
            frutas[gerarNumAleatorio(0, frutas.length - 1)].toLocaleLowerCase(),
        );
        setChance(3);
        setLetraErrada([]);
        setEncontrado([]);
    };
    const verificar = () => {
        if (chance === 0) {
            console.log("perdeu !");
        }
    };

    const resetar = () => {
        setChance(3);
        setEncontrado([]);
        setLetraErrada([]);
        mudarFruta();
    };

    const venceu =
        palavra &&
        palavra.split("").every((letra) => encontrado.includes(letra));

    return (
        <>
            {chance > 0 && (
                <div className="card">
                    <h3 id="chances">Chances: {chance}/3</h3>
                    <button onClick={() => mudarFruta()}>Mudar fruta</button>
                    {letraErrada.length > 0 && (
                        <p>
                            Letras erradas:{" "}
                            <span id="erradas">{letraErrada}</span>
                        </p>
                    )}
                    <input
                        type="text"
                        ref={inputLetra}
                        maxLength={1}
                        placeholder="Digite uma letra"
                        disabled={disable}
                        value={letra}
                        onChange={({ target }) =>
                            setLetra(target.value.toLocaleLowerCase())
                        }
                    />
                    {encontrado.includes(letra) && "Você já achou essa letra"}
                    <button
                        onClick={() => {
                            play();
                            verificar();
                        }}
                    >
                        Tentar
                    </button>
                    {palavra && <p>Fruta com {palavra.length} letras</p>}
                    <ul>
                        {palavra &&
                            Array.from(palavra).map((letras) => (
                                <>
                                    {encontrado.includes(letras) ? letras : "?"}
                                </>
                            ))}
                    </ul>
                </div>
            )}
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
