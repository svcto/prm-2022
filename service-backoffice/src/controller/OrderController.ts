import { Order } from '../entity/Order';
import { Request, Response } from "express";
import { TypeORMError } from "typeorm";


class OrderController {

    public async index(request: Request, response: Response) {
        try {
            //Buscar TODOS os registros do banco
            const brands = await Order.find();

            //Retorno a lista
            return response.json(brands);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

    public async create(request: Request, response: Response) {
        try {
            //Salvo no banco a entidade que veio na requisição
            const brand = await Order.save(request.body);

            //Retorno a entidade inserida
            return response.status(201).json(brand);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

    public async show(request: Request, response: Response) {
        try {
            //Pego o ID que foi enviado por request param
            const {id} = request.params;

            //Verifico se veio o parametro ID
            if (!id) {
                return response.status(400).json({message: 'Parâmetro ID não informado'})
            }

            //Busco a entity no banco pelo ID
            const found = await Order.findOneBy({
                id: Number(id)
            });

            //Verifico se encontrou a brand
            if (!found) {
                return response.status(404).json({message: 'Recurso não encontrado'})
            }

            //Retorno a entidade encontrada
            return response.json(found);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

    public async cancelar(request: Request, response: Response) {
        try {
            //Pego o ID que foi enviado por request param
            const {id} = request.params;

            //Verifico se veio o parametro ID
            if (!id) {
                return response.status(400).json({message: 'Parâmetro ID não informado'})
            }

            //Busco a entity no banco pelo ID
            const found = await Order.findOneBy({
                id: Number(id)
            });

            //Verifico se encontrou a brand
            if (!found) {
                return response.status(404).json({message: 'Recurso não encontrado'})
            }
            found.canceledDate = new Date();
            //Atualizo com os nos dados
            await Order.update(found.id, found);

            const novo = found;

            //Altero o ID para o que veio no request
            novo.id = found.id;

            //Retorno a entidade encontrada
            return response.json(novo);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }

   

}

export default new OrderController();