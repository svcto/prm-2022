import express from 'express';
import cors from 'cors';

const app = express();

const PORT = 3303

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Service backoffice running in port ${PORT}`);
})




