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
const {BotChat} = grpc.loadPackageDefinition(packageDefinition).chat;

const client = new BotChat(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure(),
);

client.Send({chatID: 1, message: ''}, (error, message) => {
    console.log(error, message);
});

export default client;

