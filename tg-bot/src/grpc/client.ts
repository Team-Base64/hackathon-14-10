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

const {MessageService} = grpc.loadPackageDefinition(packageDefinition);

const client = new MessageService(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure(),
);

client.Send(null, (error, message) => {
    // if (!error) throw error;
    console.log(error, message);
});
