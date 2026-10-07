import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);

// Lembre-se que... 
// StrictMode = ajuda a identificar problemas durante o desenvolvimento.
// createRoot = Importa a função responsável por criar a "raiz" React da aplicação.