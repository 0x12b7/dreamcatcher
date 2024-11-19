import {default as Express} from "express";
import {ReactRouter} from "./router/ReactRouter";
import {join} from "path";

const directory: string = join(__dirname, "web");
const port: bigint = 3000n;
const app = Express()
    .use(Express.static(directory))
    .use(Express.json())
    .use((await ReactRouter(directory)).unwrap())
    .listen(port);