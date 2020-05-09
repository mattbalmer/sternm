export type UserID = string;

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type User = {
  _id: UserID,
  roles: UserRole[],
  profile: {
    name: string,
    avatar?: string,
  },
  dates: {
    created: Date,
    updated?: Date,
    lastLoggedIn?: Date,
  },
  oath?: {
    googleId?: string,
  },
  contact?: {
    email?: string,
  },
}

export type Lobby = {
  _id: string,
  title: string,
  owner: UserID,
  users: UserID[],
  chat: {
    message: string,
    timestamp: Date,
    sender: UserID,
  }[],
  dates: {
    created: Date,
    started: Date,
    finished: Date,
  },
};