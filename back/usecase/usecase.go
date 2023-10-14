package usecase

import (
	"bytes"
	"encoding/json"
	"log"
	"main/domain/model"
	rep "main/repository"
	"net/http"

	"github.com/google/uuid"
)

type UsecaseInterface interface {
	CreateTeacher(params *model.TeacherDB) error
	GetTeacher(id int) (*model.TeacherDB, error)
	ChangeTeacher(params *model.TeacherDB) error
	GetChatsByTeacherID(id int) (model.Chats, error)
	AddStudent(params *model.CreateStudentDB) error
	SendMessage(in *model.CreateMessage) error
	RecieveMessage(in *model.CreateMessage) error
}

type Usecase struct {
	//botManager mail.MailServiceClient
	store rep.StoreInterface
}

func NewUsecase(us rep.StoreInterface) UsecaseInterface {
	return &Usecase{
		//botManager: mailManager,
		store: us,
	}
}

func (api *Usecase) CreateTeacher(params *model.TeacherDB) error {
	return api.store.AddTeacher(params)
}

func (api *Usecase) GetTeacher(id int) (*model.TeacherDB, error) {
	return api.store.GetTeacher(id)
}

func (api *Usecase) ChangeTeacher(params *model.TeacherDB) error {
	return api.store.UpdateTeacher(params)
}

func (api *Usecase) AddStudent(params *model.CreateStudentDB) error {
	newUUID := uuid.New()
	api.store.CreateChat(&model.ChatDB{TeacherID: 1, StudentHash: newUUID.String()})
	return api.store.AddStudent(&model.StudentDB{InviteHash: newUUID.String(), Name: params.Name})
}

func (api *Usecase) SendMessage(in *model.CreateMessage) error {
	//fetch на фронт

	postBody, _ := json.Marshal(in)
	responseBody := bytes.NewBuffer(postBody)
	//Leverage Go's HTTP Post function to make request
	resp, err := http.Post("http://127.0.0.1:8082/post", "application/json", responseBody)
	//Handle Error
	if err != nil {
		log.Println("An Error Occured ")
	}
	defer resp.Body.Close()
	err = api.store.AddMessage(in)
	return err
}

func (api *Usecase) RecieveMessage(in *model.CreateMessage) error {
	err := api.store.AddMessage(in)
	return err
}

func (api *Usecase) GetChatsByTeacherID(id int) (model.Chats, error) {
	chats, err := api.store.GetChatsByID(id)
	return *chats, err
}
