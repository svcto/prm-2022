import { Customer } from "./../../entity/Customer";
import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { Product } from "../../entity/Product";
import { ProductImage } from "../../entity/ProductImage";

//Declarar um canal com o Rabbit
let channel: Channel;

const connect = async () => {
  const conn: Connection = await amqp.connect("amqp://localhost");
  channel = await conn.createChannel();
};

//Consome o conteúdo de uma fila
const consumeQueue = async (
  queue: string,
  callback: (message: ConsumeMessage | null) => void
) => {
  await channel.assertQueue(queue);
  return channel.consume(queue, (message) => {
    callback(message);

    if (message) {
      channel.ack(message);
    }
  });
};

//Consumir fila de clientes
const consumeCustomer = async () => {
  await consumeQueue("prm-customer", async (message) => {
    if (message) {
      const customer = JSON.parse(message?.content.toString());
      await Customer.save(customer);
      console.log("Cliente salno no banco");
    }
  });
};

const consumeUpload = async () => {
  await consumeQueue("prm-upload", async (message) => {
    if (message) {
      const obj = JSON.parse(message?.content.toString());

      try {
        const { id, urlImage } = JSON.parse(obj);
        const found = await Product.findOneBy({
          id: Number(id),
        });
        if (!found) {
          return console.error("Recurso não encontrado");
        }

        if (!found.images) {
          found.images = [];
        }
        const img: ProductImage = new ProductImage();
        img.product = found;
        img.imageUrl = urlImage;
        found.images.push(img);
        
        await Product.update(found.id, found);
      } catch (e) {
        console.error(e);
      }

      console.log("Imagem salva no produto");
    }
  });
};

export { connect, consumeCustomer, consumeUpload };
