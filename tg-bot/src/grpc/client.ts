const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = 'proto/model.proto';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const MessageProto = grpc.loadPackageDefinition(packageDefinition).chat;

// const client = new MessageProto.BotChat(
//     '127.0.0.1:8081',
//     grpc.credentials.createInsecure(),
// );

// // const Send = (call, callback) => {
// //     console.log(new Date(), call.request);
// //     net.sendMessageFromClient(call.request);
// //     callback(null, {isSuccessful: true});
// // };

// //client.addService(MessageProto.BotChat.client, {Send: Send});
// const Mes = {chatID: 1, text: ''};
// client.Send({Mes}, (error, message) => {
//     console.log(error, message);
// });

// export default client;

//function main() {
   
    const client = new MessageProto.BotChat(
        '127.0.0.1:8081',
        grpc.credentials.createInsecure(),
    );
    //console.log(grpc.status);

    // const Mes = {chatID: 1, text: '123'};
    // // client.Recieve(Mes, function(err, response) {
    // //   console.log('Greeting:', response, Mes);
    // // });
    // client.Recieve(Mes, function(creationFailed, productCreated){
    //     console.log("On Success:",productCreated);
    //     console.log("On Failure:",creationFailed);
    // });  
 // }
   export default client;
 // main();