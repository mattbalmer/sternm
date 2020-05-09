export type UserID = string;

export enum UserRole {
  MEMBER = 'MEMBER',
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
