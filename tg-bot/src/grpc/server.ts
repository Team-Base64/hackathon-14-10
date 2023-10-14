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
    {id: '1', text: 'Note 1'};

server.addService(MessageProto.MessageService.service, {
    getMessage: (_, callback) => {
        callback(null, message);
    },
});

server.bindAsync(
    '127.0.0.1:8080',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log('Server running at http://127.0.0.1:8080');
        server.start();
    },
);
