// package: 
// file: chat.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as chat_pb from "./chat_pb";

interface IChatService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    send: IChatService_Isend;
}

interface IChatService_Isend extends grpc.MethodDefinition<chat_pb.Message, chat_pb.Message> {
    path: "/Chat/send";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<chat_pb.Message>;
    requestDeserialize: grpc.deserialize<chat_pb.Message>;
    responseSerialize: grpc.serialize<chat_pb.Message>;
    responseDeserialize: grpc.deserialize<chat_pb.Message>;
}

export const ChatService: IChatService;

export interface IChatServer extends grpc.UntypedServiceImplementation {
    send: grpc.handleBidiStreamingCall<chat_pb.Message, chat_pb.Message>;
}

export interface IChatClient {
    send(): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
    send(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
    send(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
}

export class ChatClient extends grpc.Client implements IChatClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public send(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
    public send(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<chat_pb.Message, chat_pb.Message>;
}
