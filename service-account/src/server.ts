import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
// instanciando a aplicação express

dotenv.config();

const app = express();

// porta de execucao 
const PORT = process.env.PORT || 3302;

//Middleware
app.use(cors())
app.use(express.json())

// importa as rotas
app.use('/account', routes)

//inicia
app.listen(PORT, () => console.log(`service-account ta ligado na ${PORT}`))
