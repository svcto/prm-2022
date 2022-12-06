import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

const PORT = 3303

app.use(cors());
app.use(express.json());
app.use("/service-upload", routes);

app.listen(PORT, () => {
    console.log(`Service upload running in port ${PORT}`);
})




