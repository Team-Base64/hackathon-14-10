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

const MessageService = grpc.loadPackageDefinition(packageDefinition).BotChat;

const client = new MessageService(
    'localhost:8080',
    grpc.credentials.createInsecure(),
);

client.getMessage({}, (error, message) => {
    if (!error) throw error;
    console.log(message);
});
