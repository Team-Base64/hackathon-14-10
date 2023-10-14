package usecase

import (
	"main/domain/model"
	rep "main/repository"

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

	return nil
}

func (api *Usecase) RecieveMessage(in *model.CreateMessage) error {
	err := api.store.AddMessage(in)
	// orderid := int32(in.OrderID)
	// ans, err := api.mailManager.SendMail(
	// 	context.Background(),
	// 	&mail.Mail{Type: in.Type, Username: in.Username, Useremail: in.Useremail, OrderStatus: &in.OrderStatus, Promocode: &in.Promocode, OrderID: &orderid})
	// if err != nil || !ans.IsSuccessful {
	// 	return err
	// }
	return err
}

func (api *Usecase) GetChatsByTeacherID(id int) (model.Chats, error) {
	chats, err := api.store.GetChatsByID(id)
	return *chats, err
}
