import express from "express";
import bodyParser from "body-parser";
const express_server = express();

express_server.use(bodyParser.json());

export default express_server;
