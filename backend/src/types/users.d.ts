export type Signup_type = string
export type Login_decice = string
export type Aggreement = string

export type User = {
    id: string,
    username: string,
    confirmed: boolean,
    signup_type: string,
    signup_date: string,
    logged_in_devices: [Login_decice],
    aggreements: [Aggreement],
    friends: [Relationship]
    events: [Event]
}

export interface oryUser {
    id: string,
    email: string
}

export interface createUser {
    username: string,
    description: string,
    pic_URL: string,
    name: string,
    oryUser: oryUser
}

export type Relationship = {
    id: string,
    accepted: boolean,
    accepted_at: string
    blocked: boolean
    blocked_at: string
}

export type Event = {
    id: string,
    title: string
    date: Date
}
