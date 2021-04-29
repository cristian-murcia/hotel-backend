import { config } from "../config";
import { App } from "./app";

async function main() {
    const app = new App(config.api.port);
    await app.listen();
}

main();