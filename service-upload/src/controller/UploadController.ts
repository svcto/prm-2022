import { Response } from "express";
import { sendToQueue } from "../services/amqp";
import { uploadImage } from "../services/firebase";

class UploadController {
  public async doUpload(request: any, response: Response) {
    const id= request.query.id;
    const url = uploadImage(request.file);
    sendToQueue(JSON.stringify({ id, url }));
    return response.send(url);
  }
}
export default new UploadController();
