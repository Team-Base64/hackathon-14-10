package main

import (
	"context"
	"log"
	"net"
	"sync"

	chat "main/microservices/chatServer/gen_files"

	conf "main/config"

	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/jackc/pgx/v5/pgxpool"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Println("cant listen port", err)
	}

	urlDB := "postgres://" + conf.DBSPuser + ":" + conf.DBPassword + "@" + conf.DBHost + ":" + conf.DBPort + "/" + conf.DBName
	//urlDB := "postgres://" + os.Getenv("TEST_POSTGRES_USER") + ":" + os.Getenv("TEST_POSTGRES_PASSWORD") + "@" + os.Getenv("TEST_DATABASE_HOST") + ":" + os.Getenv("DB_PORT") + "/" + os.Getenv("TEST_POSTGRES_DB")
	config, _ := pgxpool.ParseConfig(urlDB)
	config.MaxConns = 70
	db, err := pgxpool.New(context.Background(), config.ConnString())

	if err != nil {
		log.Println("could not connect to database")
	} else {
		log.Println("database is reachable")
	}
	defer db.Close()

	server := grpc.NewServer()
	chat.RegisterBotChatServer(server, NewChatManager())

	log.Println("starting server at :8081")
	server.Serve(lis)
}

const sessKeyLen = 10

type ChatManager struct {
	chat.UnimplementedBotChatServer

	mu sync.RWMutex
}

func NewChatManager() *ChatManager {
	return &ChatManager{
		mu: sync.RWMutex{},
	}
}

func (sm *ChatManager) Send(ctx context.Context, in *chat.Message) (*chat.Status, error) {
	log.Println("call Send ", in)
	// newUUID := uuid.New()
	// id := &session.SessionID{
	// 	ID: newUUID.String(),
	// }
	// sm.mu.Lock()
	// sm.sessions[id.ID] = in
	// sm.mu.Unlock()

	return &chat.Status{IsSuccessful: true}, nil
}

func (sm *ChatManager) Receive(ctx context.Context, in *chat.Message) (*chat.Status, error) {
	log.Println("call Receive ", in)
	// newUUID := uuid.New()
	// id := &session.SessionID{
	// 	ID: newUUID.String(),
	// }
	// sm.mu.Lock()
	// sm.sessions[id.ID] = in
	// sm.mu.Unlock()

	return &chat.Status{IsSuccessful: true}, nil
}

// func (sm *SessionManager) Check(ctx context.Context, in *session.SessionID) (*session.Session, error) {
// 	log.Println("call Check", in)
// 	sm.mu.RLock()
// 	defer sm.mu.RUnlock()
// 	if sess, ok := sm.sessions[in.ID]; ok {
// 		return sess, nil
// 	}
// 	return nil, grpc.Errorf(codes.NotFound, "session not found")
// }

// func (sm *SessionManager) Delete(ctx context.Context, in *session.SessionID) (*session.Nothing, error) {
// 	log.Println("call Delete", in)
// 	sm.mu.Lock()
// 	defer sm.mu.Unlock()
// 	delete(sm.sessions, in.ID)
// 	return &session.Nothing{IsSuccessful: true}, nil
// }
