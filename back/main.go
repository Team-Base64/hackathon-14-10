package main

import (
	"context"
	"log"
	"net/http"

	"main/delivery"
	_ "main/docs"
	"main/repository"
	"main/usecase"

	"github.com/gorilla/mux"
	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/jackc/pgx/v5/pgxpool"

	conf "main/config"

	httpSwagger "github.com/swaggo/http-swagger"
	//bot "main/microservices/auth/gen_files"
)

func loggingAndCORSHeadersMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.RequestURI, r.Method)

		for header := range conf.Headers {
			w.Header().Set(header, conf.Headers[header])
		}
		next.ServeHTTP(w, r)
	})
}

// var (
// 	botManager bot.BotServiceClient
// )

func main() {
	myRouter := mux.NewRouter()
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

	// grcpConnBot, err := grpc.Dial(
	// 	"127.0.0.1:8081",
	// 	grpc.WithTransportCredentials(insecure.NewCredentials()),
	// )
	// if err != nil {
	// 	log.Println("cant connect to grpc bot Leo")
	// } else {
	// 	log.Println("connected to grpc bot Leo")
	// }
	// defer grcpConnBot.Close()

	//botManager = auth.NewAuthCheckerClient(grcpConnAuth)

	Store := repository.NewStore(db)

	Usecase := usecase.NewUsecase(Store)

	Handler := delivery.NewHandler(Usecase)

	myRouter.HandleFunc(conf.PathSignUp, Handler.CreateTeacher).Methods(http.MethodPost, http.MethodOptions)
	myRouter.HandleFunc(conf.PathProfile, Handler.GetTeacher).Methods(http.MethodGet, http.MethodOptions)
	myRouter.HandleFunc(conf.PathProfile, Handler.ChangeProfile).Methods(http.MethodPost, http.MethodOptions)
	myRouter.HandleFunc(conf.PathAddStudent, Handler.AddStudent).Methods(http.MethodPost, http.MethodOptions)
	myRouter.HandleFunc(conf.PathSend, Handler.SendMessage).Methods(http.MethodPost, http.MethodOptions)

	myRouter.HandleFunc(conf.PathChats, Handler.GetTeacherChats).Methods(http.MethodGet, http.MethodOptions)

	myRouter.PathPrefix(conf.PathDocs).Handler(httpSwagger.WrapHandler)
	myRouter.Use(loggingAndCORSHeadersMiddleware)

	err = http.ListenAndServe(conf.Port, myRouter)
	if err != nil {
		log.Println("cant serve", err)
	}
}
