import amqp, { Channel, Connection } from "amqplib";

//Declarar um canal com o Rabbit
let channel: Channel;

const connect = async () => {
  const conn: Connection = await amqp.connect("amqp://localhost");
  channel = await conn.createChannel();
};

//Conecta no RabbitMQ
connect()
  .then(() => {
    console.log("Conectado ao RabbitMQ");
  })
  .catch((error) => {
    console.log("Não foi possível conectar ao RabbitMQ");
  });

//Envia uma mensagem à fila
const sendToQueue = async (message: string) => {
  await channel.assertQueue("prm-upload");
  return channel.sendToQueue("prm-upload", Buffer.from(message));
};

export { sendToQueue };
