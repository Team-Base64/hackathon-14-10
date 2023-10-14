// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.swagger.io/support",
            "email": "support@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/addstudent": {
            "post": {
                "description": "Add student",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Add student",
                "operationId": "addStudent",
                "parameters": [
                    {
                        "description": "Student params",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.CreateStudentDB"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Response"
                        }
                    },
                    "400": {
                        "description": "Bad request - Problem with the request",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "401": {
                        "description": "Unauthorized - Access token is missing or invalid",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error - Request is valid but operation failed at server side",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    }
                }
            }
        },
        "/chats/{teacherID}": {
            "get": {
                "description": "Get chats messages of teacher",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Get chats messages of teacher",
                "operationId": "getChats",
                "parameters": [
                    {
                        "type": "string",
                        "description": "The category of products",
                        "name": "teacherID",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Chats"
                        }
                    },
                    "401": {
                        "description": "Unauthorized - Access token is missing or invalid",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error - Request is valid but operation failed at server side",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    }
                }
            }
        },
        "/profile": {
            "get": {
                "description": "gets teacher's info",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Get teacher's info",
                "operationId": "getTeacher",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.TeacherDB"
                        }
                    },
                    "401": {
                        "description": "Unauthorized - Access token is missing or invalid",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error - Request is valid but operation failed at server side",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    }
                }
            },
            "post": {
                "description": "changes teacher's parameters",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "changes teacher's parameters",
                "operationId": "changeUserParameters",
                "parameters": [
                    {
                        "description": "Teacher params",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.TeacherDB"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Response"
                        }
                    },
                    "400": {
                        "description": "Bad request - Problem with the request",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "401": {
                        "description": "Unauthorized - Access token is missing or invalid",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error - Request is valid but operation failed at server side",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    }
                }
            }
        },
        "/register": {
            "post": {
                "description": "Create teacher",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Create teacher",
                "operationId": "createTeacher",
                "parameters": [
                    {
                        "description": "Teacher params",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.TeacherDB"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Response"
                        }
                    },
                    "401": {
                        "description": "Unauthorized - Access token is missing or invalid",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error - Request is valid but operation failed at server side",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    }
                }
            }
        },
        "/send": {
            "post": {
                "description": "Send Message",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Send Message",
                "operationId": "sendMessage",
                "parameters": [
                    {
                        "description": "Message",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.CreateMessage"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Response"
                        }
                    },
                    "400": {
                        "description": "Bad request - Problem with the request",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "401": {
                        "description": "Unauthorized - Access token is missing or invalid",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error - Request is valid but operation failed at server side",
                        "schema": {
                            "$ref": "#/definitions/model.Error"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "model.Chat": {
            "type": "object",
            "properties": {
                "messages": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.MessageChat"
                    }
                }
            }
        },
        "model.Chats": {
            "type": "object",
            "properties": {
                "chats": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.Chat"
                    }
                }
            }
        },
        "model.CreateMessage": {
            "type": "object",
            "properties": {
                "attaches": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "studentInviteHash": {
                    "type": "string"
                },
                "text": {
                    "type": "string"
                }
            }
        },
        "model.CreateStudentDB": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                }
            }
        },
        "model.Error": {
            "type": "object",
            "properties": {
                "error": {}
            }
        },
        "model.MessageChat": {
            "type": "object",
            "properties": {
                "attaches": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "isAuthorTeacher": {
                    "type": "boolean"
                },
                "text": {
                    "type": "string"
                },
                "time": {
                    "type": "string"
                }
            }
        },
        "model.Response": {
            "type": "object",
            "properties": {
                "body": {}
            }
        },
        "model.TeacherDB": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "login": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "tgAccount": {
                    "type": "string"
                },
                "tgBotLink": {
                    "type": "string"
                },
                "vkAccount": {
                    "type": "string"
                },
                "vkBotLink": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "127.0.0.1:8080",
	BasePath:         "/api",
	Schemes:          []string{},
	Title:            "TCRA API",
	Description:      "TCRA back server.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
