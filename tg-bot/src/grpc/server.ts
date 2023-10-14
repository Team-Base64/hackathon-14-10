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
const MessageProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
const message =
    {text: 'Note 1', chatID: '1'};

const Send = (call, callback) => {
    console.log(call);
    callback(null, message);
};

const Recieve = (call, callback) => {
    console.log(call);
    callback(null, message);
};

server.addService(MessageProto.MessageService.service, {
    Send: Send,
    Recieve: Recieve,
});

server.bindAsync(
    '127.0.0.1:50051',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log('Server running at http://127.0.0.1:50051');
        server.start();
    },
);
