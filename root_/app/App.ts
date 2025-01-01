import {default as Express} from "express";
import {ReactRouter} from "->router";
import {join} from "path";

let directory: string = join(__dirname, "web");
let port: bigint = 3000n;
let app = Express()
    .use(Express.static(directory))
    .use(Express.json())
    .use((await ReactRouter(directory)).unwrap())
    .listen(port);