
// const grpc = require('@grpc/grpc-js');
// const PROTO_PATH = 'proto/model.proto';
// const protoLoader = require('@grpc/proto-loader');

// var messages = require('./proto/model_pb');
// var services = require('./proto/model_grpc_pb');

// const options = {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true,
// };

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
// const MessageProto = grpc.loadPackageDefinition(packageDefinition);

// const server = new grpc.Server();
// const message =
//     {text: 'Note 1', chatID: '1'};

// // const Send = (call, callback) => {
// //     console.log(call);
// //     callback(null, message);
// // };
// function Send(call) {
//     var reply = new messages.Status();
//     //reply.setMessage('Hello ' + call.request.getName());
//     reply.setMessage(true);
//     //callback(null, reply);
//   }
// // const Recieve = (call, callback) => {
// //     console.log("Recieve");
// //     //console.log(call);
// //     //Status a
// //     callback(null, {isSuccessful:true});
// //    // callback(null, {message: true});
// // };

// function Receive(call, callback) {
//     //var reply = new messages.Status();
//     //reply.setMessage('Hello ' + call.request.getName());
//     //reply.setMessage(true);
//     callback(null, {isSuccessful: true});
//   }

// // server.addService(services.BotChatService, {
// //     Send: Send,
// //     Recieve: Recieve,
// // });

// // server.bindAsync(
// //     '127.0.0.1:50051',
// //     grpc.ServerCredentials.createInsecure(),
// //     (error, port) => {
// //         console.log('Server running at http://127.0.0.1:50051');
// //         server.start();
// //     },
// // );

// function main() {
//     var server = new grpc.Server();
//     server.addService(services.BotChatService.service, {Send: Send, Receive: Receive});
//     server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
//         console.log('Server running at http://127.0.0.1:50051');
//       server.start();
//     });
//   }
  
//   main();


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
const message =
    {text: 'Note 1', chatID: '1'};

const Send = (call, callback) => {
    console.log(new Date());
    callback(null, {isSuccessful:true});
};

const Recieve = (call, callback) => {
    console.log(new Date());
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