// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_model_pb = require('../proto/model_pb.js');

function serialize_Message(arg) {
  if (!(arg instanceof proto_model_pb.Message)) {
    throw new Error('Expected argument of type Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Message(buffer_arg) {
  return proto_model_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Status(arg) {
  if (!(arg instanceof proto_model_pb.Status)) {
    throw new Error('Expected argument of type Status');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Status(buffer_arg) {
  return proto_model_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}


var BotChatService = exports.BotChatService = {
  // From server to bot
send: {
    path: '/BotChat/Send',
    requestStream: false,
    responseStream: false,
    requestType: proto_model_pb.Message,
    responseType: proto_model_pb.Status,
    requestSerialize: serialize_Message,
    requestDeserialize: deserialize_Message,
    responseSerialize: serialize_Status,
    responseDeserialize: deserialize_Status,
  },
  // From api to bot
receive: {
    path: '/BotChat/Receive',
    requestStream: false,
    responseStream: false,
    requestType: proto_model_pb.Message,
    responseType: proto_model_pb.Status,
    requestSerialize: serialize_Message,
    requestDeserialize: deserialize_Message,
    responseSerialize: serialize_Status,
    responseDeserialize: deserialize_Status,
  },
};

exports.BotChatClient = grpc.makeGenericClientConstructor(BotChatService);
