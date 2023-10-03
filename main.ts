
import { build } from './server';

const main = async () => {
    const server = await build();
    server.listen({ port: 4000 }, () => {
        console.info("INFO: Server listening on Port http://localhost:4000 ...");
    });
}

main()