import type React from "react";

type filho = {
    titulo: string;
    children?: React.ReactNode;
};

export default function Teste({ children, titulo }: filho) {
    return (
        <>
            <h2>Foi adicionado via children logo abaixo:</h2>
            <h3>titulo: {titulo}</h3>
            {children}
        </>
    );
}
