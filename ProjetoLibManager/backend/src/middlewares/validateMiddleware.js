// Aqui fica a função que valida os dados que chegam de acordo com o schema

export function validar(schema) {

    return (req, res, next) => {

        // Valida se os dados batem com o schema
        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {

            return res.status(400).json({
                mensagem: 'Dados inválidos.',
                erros: resultado.error.issues, // error.issues exibe todos os erros que o schema lançou
            });
        }

        req.body = resultado.data; // 
        next();
    };
}


// front -> schema/rota -> controller