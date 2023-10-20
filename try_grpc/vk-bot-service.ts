import {ChatClient} from "./proto/chat_grpc_pb";
import {credentials} from "@grpc/grpc-js";
import {Message} from "./proto/chat_pb";
import * as readline from "readline";


const client = new ChatClient('localhost:5000', credentials.createInsecure());

const stream = client.send();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


stream.on('data', (msg: Message) => {
    console.log('msg from serv: ', msg);
});

stream.on('end', () => {
    console.log('Server closed');
    stream.end();
    rl.close();
});
stream.on('error', (e) => {
    console.log(e);
    stream.end();
    rl.close();
});


rl.on('line', (line) => {
    if (line === 'exit') {
        console.log('Bye!');
        stream.end();
        rl.close();
    }

    const msg = new Message();
    msg.setText(line);

    stream.write(msg);
});