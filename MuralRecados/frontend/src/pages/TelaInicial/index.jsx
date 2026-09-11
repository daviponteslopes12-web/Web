import Navbar from "../../components/Navbar/index.jsx";
import BarraCriarTarefa from "../../components/BarraCriarTarefa/index.jsx";
import ListaTarefas from "../../components/ListaTarefas/index.jsx";
import { useState, useEffect } from "react";
import {buscarTarefas} from "../../services/tarefaService.js";

function TelaInicial() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState({
        titulo: "",
        descricao: "",
        status: "em espera",
    });

    const adicionarTarefaNaLista = (tarefa) => {
        setTarefas((tarefasAtuais) => [
            ...tarefasAtuais,
            tarefa
        ]);
    };

    useEffect(() => {
        const carregarTarefas = async () => {
            try {
                const resultado = await buscarTarefas();
                setTarefas(resultado.resultado);
            } catch (erro) {
                console.error(erro);
            }
        };

        carregarTarefas();
    }, []);

    return (
        <>
            <Navbar />

            <BarraCriarTarefa 
            novaTarefa={novaTarefa} 
            setNovaTarefa={setNovaTarefa}
            adicionarTarefaNaLista={adicionarTarefaNaLista} 
            />

            <ListaTarefas tarefas={tarefas} />
        </>
    );
}

export default TelaInicial;
