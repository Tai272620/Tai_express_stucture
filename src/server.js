
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const server = express();

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on: ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
})