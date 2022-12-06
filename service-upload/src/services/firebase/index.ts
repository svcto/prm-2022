import dotenv from 'dotenv';

import * as admin from 'firebase-admin';


import { initializeApp, FirebaseError } from "firebase/app";

var account = require('./certs/service-account.json')

const BUCKET = 'prm-2022-8ee8e.appspot.com'

//Carregar variaveis de ambiente
dotenv.config();

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(account),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const uploadImage = async (req, res, next) => {
  if (!req.file) return next();

  const imagem = req.file;
  const nomeArquivo = `${Date.now()}.${imagem.originalname.split('.').pop()}`;

  const file = bucket.file(nomeArquivo);

  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype
    }
  });

  stream.on('error', (e) => {
    console.error(e);
  });

  stream.on('finish', async () => {
    await file.makePublic();

  })

  stream.end(imagem.buffer);

}


