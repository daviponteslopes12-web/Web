import type { Request, Response } from "express";
import { ProdutoService } from "../service/produto.service.js";



export const ProdutoController = {

    async listarTodosProdutos(req: Request, res: Response): Promise<Response> {

        try {

            const resposta = await ProdutoService.listarTodosProdutos();

            return res.status(200).json({ resposta });

        } catch (erro) {

            return res.status(500).json({ mensagem: "Erro interno do servidor" });

        }
    }
};