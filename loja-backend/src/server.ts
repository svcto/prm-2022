import express from "express";

// instanciando a aplicação express
const app = express();

// porta de execucao 
const PORT = 3300;

app.listen(PORT, () => console.log(`ta ligado na ${PORT}`))

