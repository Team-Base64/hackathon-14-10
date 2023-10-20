import {TunnelService, ITunnelServer} from "./proto/chat_grpc_pb";
import {Message} from "./proto/chat_pb";
import {ServerCredentials, Server, ServerDuplexStream, UntypedHandleCall} from "@grpc/grpc-js";
import * as readline from "readline";

class TunnelServer implements ITunnelServer {
    [name: string]: UntypedHandleCall;

    messageTunnel(call: ServerDuplexStream<Message, Message>): void {
        call.on('data', (msg) => {
            console.log('server receive: ', msg.getText());
        });
        call.on('end', () => {
            console.log('someone disconn');
        });
        call.write(
            (new Message())
                .setText('Hello from server!')
        );

        const loop = (cnt: number) => {
            setTimeout(() => {
                const msg = new Message();
                msg.setText('Ping from server ' + String(cnt));
                call.write(msg);
                loop(++cnt);
            }, 1500);
        };

        loop(0);
    }
}

const server = new Server();
const impl = new TunnelServer();
server.addService(TunnelService, impl);

server.bindAsync('localhost:5000', ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    server.start();

    console.log('Listening ', port);
});


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    console.log('Send to clients: ', line);
});


