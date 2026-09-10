import Navbar from "../../components/Navbar/index.jsx"
import BarraCriarTarefa from "../../components/BarraCriarTarefa/index.jsx";
import { useState } from "react";

function TelaInicial() {
    const [novaTarefa, setNovaTarefa] = useState({
        titulo: "",
        descricao: "",
        status: "em espera"
    });


    return (
        <>
            <Navbar />

            <BarraCriarTarefa 
                novaTarefa={novaTarefa}
                setNovaTarefa={setNovaTarefa}
            />
        </>
    );
}

export default TelaInicial;