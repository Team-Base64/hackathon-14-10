//import Net = module("Net");
//import tgBot = require('../index')
import Net from "./index"
const grpc = require('@grpc/grpc-js');
const PROTO_PATH = 'proto/model.proto';
const protoLoader = require('@grpc/proto-loader');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const MessageProto = grpc.loadPackageDefinition(packageDefinition).chat;

const server = new grpc.Server();
// const message =
//     {text: 'Note 1', chatID: '1'};

const Send = (call, callback) => {
  console.log(new Date(), call.request);
  //console.log(new Date(), call);
  net.sendMessageFromClient(call.request);
    callback(null, {isSuccessful:true});
};

const Recieve = (call, callback) => {
    console.log(new Date(), call.request);
    net.sendMessageFromClient(call.request);
    callback(null, {isSuccessful:true});
};

server.addService(MessageProto.BotChat.service, {Send: Send, Recieve: Recieve});

server.bindAsync(
    '127.0.0.1:50051',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log('Server running at http://127.0.0.1:50051');
        server.start();
    },
);

const tokens = [
  '1064016468:AAEaJJWW0Snm_sZsmQtgoEFbUTYj6pM60hk',
  '1290980811:AAEgopVWqb7o0I72cwdIGGZRsRyE0GGNkLA',
];

const net = new Net(tokens, [0,1]);