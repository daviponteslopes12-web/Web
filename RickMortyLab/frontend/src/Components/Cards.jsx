import { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";

const style = {
  h1: "text-3xl text-center text-white p-5 font-bold",
  card: "border-2 flex m-5 bg-blue-900 rounded shadow-lg shadow-black",
  statusBox: "text-2xl border-2 w-full m-4 rounded bg-gray-800",
  statusLine: "border rounded-xl m-3 p-2 bg-gray-300 font-bold",
  img: "border-2 rounded-full m-3",
  paginacao: "flex justify-center",
  button: "border-2 rounded p-3 font-bold cursor-pointer",
  span: "w-4 h-4 rounded-full inline-block mr-5 border",
};

export function Cards() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCharacters(page);

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro</p>;

  const personagems = data.results;
  const info = data.info;

  return (
    <div className="bg-blue-950 min-h-screen">
      <div>
        <h1 className={`${style.h1}`}>Personagens de Rick and Morty</h1>

        {personagems.map((personagem) => (
          <div className={`${style.card}`} key={personagem.id}>
            <img
              className={`${style.img}`}
              src={personagem.image}
              alt={`Imagem de ${personagem.name}`}
            />
            <div className={`${style.statusBox}`}>
              <p className={`${style.statusLine}`}>Nome: {personagem.name}</p>

              {personagem.status == "Alive" ? (
                <p className={`${style.statusLine}`}>
                  <span className={`${style.span} bg-green-500`}></span>
                  Status: {personagem.status}
                </p>
              ) : personagem.status == "Dead" ? (
                <p className={`${style.statusLine}`}>
                  <span className={`${style.span} bg-red-500`}></span>
                  Status: {personagem.status}
                </p>
              ) : (
                <p className={style.statusLine}>
                  <span className={`${style.span} bg-gray-500`}></span>
                  Status: {personagem.status}
                </p>
              )}

              <p className={`${style.statusLine}`}>
                Espécie: {personagem.species}
              </p>

              <p className={`${style.statusLine}`}>
                Gênero: {personagem.gender}
              </p>
            </div>
          </div>
        ))}

        <div className={`${style.paginacao}`}>
          <button
            className={`${style.button} bg-red-800`}
            disabled={!info.prev}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>

          <span className="text-white m-2 font-mono">
            Página {page} de {info.pages}
          </span>

          <button
            className={`${style.button} bg-green-800`}
            disabled={!info.next}
            onClick={() => setPage((p) => p + 1)}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
