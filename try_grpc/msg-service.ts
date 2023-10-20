import {ChatService, IChatServer} from "./proto/chat_grpc_pb";
import {Message} from "./proto/chat_pb";
import {ServerCredentials, Server, ServerDuplexStream, UntypedHandleCall} from "@grpc/grpc-js";

class ChatServer implements IChatServer {
    [name: string]: UntypedHandleCall;

    send(call: ServerDuplexStream<Message, Message>): void {
        call.on('data', (msg) => {
            console.log('server receive: ', msg.getText());
        });
        call.on('end', () => {
            console.log('someone disconn');
        });
    }
}

const server = new Server();

server.addService(ChatService, new ChatServer());

server.bindAsync('localhost:5000', ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    server.start();

    console.log('Listening ', port);
});


