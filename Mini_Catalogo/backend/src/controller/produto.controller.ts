import { Request, Response } from "express";
import { buscarTodosProdutos } from "../infra/repository/produto.repository.js";

export const listarProdutos = async (req: Request, res: Response) => {
    const resultado = await buscarTodosProdutos();

    res.json(resultado)
};