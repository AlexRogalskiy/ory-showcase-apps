import {object, string} from "yup";

export default {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Wine Companion API",
        "description": "",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "host": "localhost:8080",
    "basePath": "/",
    "tags": [
        {
            "name": "health",
            "description": "Healthcheck"
        },
        {
            "name": "ory",
            "description": "Route for testing ory authorization"
        },
        {
            "name": "users",
            "description": "API for users in the system"
        },
        {
            "name": "wines",
            "description": "API for wines"
        },
        {
            "name": "events",
            "description": "API for events"
        }
    ],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "paths": {
        "/healthcheck": {
            "get": {
                "description": "server up?",
                "tags": ["health"],
                "responses": {
                    "200": {
                        "description": "success, server up"
                    }
                }
            }
        },
        "/users/find": {
            "get": {
                "description": "Get a list of all users. You can filter it with a searchstring and set a limit (default 50)",
                "tags": ["users"],
                "parameters": [
                    {
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "searchstring": {
                                    "type": "string"
                                },
                                "limit": {
                                    "type": "integer",
                                    "default": 50
                                }
                            }
                        },
                        "name": "body"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successfull operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/User"
                            }
                        }
                    }
                }
            }
        },
        "/users": {
            "post": {
                "tags": ["users"],
                "summary": "Add a new user",
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Pass the valid session token of a user that was created on ORY Public API before.",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "description": "The username.",
                                    "example": "bennihz"
                                },
                                "description": {
                                    "type": "string",
                                    "description": "The profile description",
                                    "example": "I like drinking wine and driving, but not both at the same time."
                                },
                                "profile_pic": {
                                    "type": "string",
                                    "description": "The URL of a users profile picture.",
                                    "example": "https://i.picsum.photos/id/903/222/222.jpg?hmac=Pp0afNhkJqgoou_nMS7bkCZ05u3fzmnR_bPkW59P-io"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Successfully created object"
                    }
                }
            }
        },
        "/users/profile": {
            "get": {
                "tags": ["users"],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns user object",
                        "schema": {
                            "$ref": "#/definitions/User"
                        }
                    }
                }
            },
            "put": {
                "description": "Edit a user.",
                "tags": ["users"],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    },
                    {
                        "in": "body",
                        "description": "new username",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "changes": {
                                    "type": "object",
                                    "properties": {
                                        "username": {
                                            "$ref": "#/components/schemas/username"
                                        },
                                        "description": {
                                            "$ref": "#/components/schemas/description"
                                        },
                                        "profile_pic": {
                                            "$ref": "#/components/schemas/profile_pic"
                                        }
                                    }
                                }
                            }
                        },
                        "name": "body"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully changed username"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "delete": {
                "description": "Remove a user completely from the system.",
                "tags": ["users"],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successfully deleted user"
                    }
                }
            }
        },
        "/users/profile/events/attend": {
            "get": {
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ],
                "description": "get a list of all events a user attends",
                "tags": ["users"]
            }
        },
        "/users/profile/events/host": {
            "get": {
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ],
                "description": "get a list of all events a user hosts",
                "tags": ["users"]
            }
        },
        "/wines/find": {
            "get": {
                "description": "Get all wines or search for certain attributes",
                "tags": ["wines"],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    },
                    {
                        "name": "specifications",
                        "in": "body",
                        "description": "Specification to match",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "searchstring": {
                                    "type": "string",
                                    "description": "Filter by searchstring applied by Algolia.",
                                    "example": "cuvee 2019"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "Color that the wine has to have",
                                    "example": "red"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "returns a list that contains all wines matching the attributes."
                    }
                }
            }
        },
        "/wines": {
            "post": {
                "description": "create a wine",
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ],
                "tags": ["wines"]
            }
        },
        "/wines/{id}": {
            "get": {
                "description": "get a wine",
                "tags": ["wines"]
            },
            "put": {
                "description": "edit a wine",
                "tags": ["wines"],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ]
            },
            "delete": {
                "description": "delete a wine",
                "tags": ["wines"]
            }
        },
        "/events": {
            "get": {
                "description": "get all public",
                "tags": ["events"]
            },
            "post": {
                "description": "create an event",
                "tags": ["events"],
                "consumes": ["application/json"],
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "description": "new event",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "date": {
                                    "type": "date"
                                },
                                "organizer": {
                                    "type": "object",
                                    "properties": {
                                        "id": "string",
                                        "username": "string"
                                    }
                                },
                                "link": {
                                    "type": "string"
                                },
                                "max_participants": {
                                    "type": "number"
                                },
                                "public": {
                                    "type": "boolean"
                                },
                                "theme": {
                                    "type": "string"
                                },
                                "wines": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "string"
                                            },
                                            "name": {
                                                "type": "string"
                                            },
                                            "year": {
                                                "type": "number"
                                            },
                                            "winery": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        },
        "/events/{id}": {
            "get": {
                "description": "get an event by id",
                "tags": ["events"]
            },
            "put": {
                "description": "edit an event",
                "tags": ["events"]
            },
            "delete": {
                "description": "delete an event",
                "tags": ["events"]
            }
        },
        "/verified": {
            "get": {
                "description": "Check, if a user is verified by passing an ORY Session token.",
                "tags": [
                    "ory"
                ],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Account is verified."
                    },
                    "403": {
                        "description": "Account is not verified."
                    }
                }
            }
        },
        "/whoami": {
            "get": {
                "description": "pass the session token to see wether a user is logged in or exists etc.",
                "tags": [
                    "ory"
                ],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "A User object",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "oryUser": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "string",
                                            "description": "The user ID.",
                                            "example": "efdfee74-b461-40a1-b840-b40fccfcbe6a"
                                        },
                                        "email": {
                                            "type": "string",
                                            "description": "The user email.",
                                            "example": "benjamin.hadizamani@gmail.com"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "session token invalid."
                    }
                }
            }
        },
        "/users/registrationstatus": {
            "get": {
                "description": "Check, if a user exists in firebase by passing ORY token.",
                "tags": [
                    "users"
                ],
                "parameters": [
                    {
                        "$ref": "#/components/parameters/session_token"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User exists in Firebase, registration completed.",
                    },
                    "403": {
                        "description": "User does not exist in firebase, registration not completed!"
                    }
                }
            }
        }
    },
    "securityDefinitions": {

    },
    "components": {
        "schemas": {
            "editableAttributes": {
                "username": {
                    "$ref": "#/components/schemas/username"
                },
                "description": {
                    "$ref": "#/components/schemas/description"
                },
                "profile_pic": {
                    "$ref": "#/components/schemas/profile_pic"
                }
            },
            "username": {
                "type": "string",
                "description": "A users name.",
                "example": "bennihz"
            },
            "profile_pic": {
                "type": "string",
                "description": "The URL of a users profile picture.",
                "example": "https://i.picsum.photos/id/903/222/222.jpg?hmac=Pp0afNhkJqgoou_nMS7bkCZ05u3fzmnR_bPkW59P-io"
            },
            "description": {
                "type": "string",
                "description": "The profile description",
                "example": "I like drinking wine and driving, but not both at the same time."
            }
        },
        "parameters": {
            "session_token": {
                "in": "header",
                "name": "session_token",
                "required": true,
                "type": "string",
                "description": "Pass the ORY-Session-Token received from ORY Public API."
            }
        }
    },
    "definitions": {
        "User": {
            "type": "object",
            "required": [],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "confirmed": {
                    "type": "boolean"
                },
                "username": {
                    "type": "string"
                },
                "signup_type": {
                    "type": "string"
                },
                "signup_date": {
                    "type": "string"
                },
                "logged_in_devices": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "agreements": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Agreement"
                    }
                },
                "friends": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Relationship"
                    }
                },
                "events": {

                }
            }
        },
        "Wine": {
            "type": "object",
            "properties": {

            }
        },
        "Relationship": {
            "type": "object",
            "properties": {
                "userId": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                },
                "pending": {
                    "type": "boolean"
                },
                "accepted": {
                    "type": "boolean"
                },
                "accepted_date": {
                    "type": "string"
                },
                "blocked": {
                    "type": "boolean"
                },
                "blocked_date": {
                    "type": "string"
                }
            }
        },
        "Agreement": {
            "type": "string"
        }
    }
}
