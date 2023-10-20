#!/bin/bash

# generate js codes via grpc-tools
npx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./proto \
  --grpc_out=grpc_js:./proto \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -I ./proto \
  ./proto/*.proto

# generate d.ts codes
npx protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=grpc_js:./proto \
  -I ./proto \
  ./proto/*.proto