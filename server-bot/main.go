package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"server-bot/bot"

	"google.golang.org/grpc"
)

func main() {
	// Connect with server
	grpcConnWebServer, err := grpc.Dial(
		"127.0.0.1:8080",
	)
	if err != nil {
		log.Fatalf("cant connect to grpc with server")
	}
	defer grpcConnWebServer.Close()

	// Connect with tg bot
	grpcConnTgBot, err := grpc.Dial(
		"127.0.0.1:8082",
	)
	if err != nil {
		log.Fatalf("cant connect to grpc with server")
	}
	defer grpcConnTgBot.Close()

	// Connect with vk bot
	grpcConnVkBot, err := grpc.Dial(
		"127.0.0.1:8083",
	)
	if err != nil {
		log.Fatalf("cant connect to grpc with server")
	}
	defer grpcConnVkBot.Close()

	// Start grpc bot server
	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Fatalln("cant listet port")
	}

	server := grpc.NewServer()
	bot.RegisterBotChatServer(server, NewChatBot(
		grpcConnWebServer,
		grpcConnTgBot,
		grpcConnVkBot,
	))

	fmt.Println("starting server at :8081")
	server.Serve(lis)

}

type ChatBot struct {
	bot.UnimplementedBotChatServer

	webServer bot.BotChatClient
	tgServer  bot.BotChatClient
	vkServer  bot.BotChatClient
}

func NewChatBot(
	webServerConn *grpc.ClientConn,
	tgBotConn *grpc.ClientConn,
	vkBotConn *grpc.ClientConn,
) *ChatBot {
	return &ChatBot{
		webServer: bot.NewBotChatClient(webServerConn),
		tgServer:  bot.NewBotChatClient(tgBotConn),
		vkServer:  bot.NewBotChatClient(vkBotConn),
	}
}

func (bot *ChatBot) Send(ctx context.Context, in *bot.Message) (*bot.Status, error) {
	switch in.Type {
	case "tg":
		return bot.tgServer.Send(ctx, in)
	case "vk":
		return bot.vkServer.Send(ctx, in)
	default:
		panic("unknow bot type")
	}
}

func (bot *ChatBot) Recieve(ctx context.Context, in *bot.Message) (*bot.Status, error) {
	return bot.webServer.Recieve(ctx, in)
}
