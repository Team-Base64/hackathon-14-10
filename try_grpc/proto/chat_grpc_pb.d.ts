// package: 
// file: chat.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as chat_pb from "./chat_pb";

interface ITunnelService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    messageTunnel: ITunnelService_ImessageTunnel;
}

interface ITunnelService_ImessageTunnel extends grpc.MethodDefinition<chat_pb.Message, chat_pb.Message> {
    path: "/Tunnel/messageTunnel";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<chat_pb.Message>;
    requestDeserialize: grpc.deserialize<chat_pb.Message>;
    responseSerialize: grpc.serialize<chat_pb.Message>;
    responseDeserialize: grpc.deserialize<chat_pb.Message>;
}

export const TunnelService: ITunnelService;

export interface ITunnelServer extends grpc.UntypedServiceImplementation {
    messageTunnel: grpc.handleBidiStreamingCall<chat_pb.Message, chat_pb.Message>;
}

export interface ITunnelClient {
    messageTunnel(): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
    messageTunnel(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
    messageTunnel(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
}

export class TunnelClient extends grpc.Client implements ITunnelClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public messageTunnel(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
    public messageTunnel(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
}
