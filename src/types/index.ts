export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteInput {
  title: string;
  content: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    createdAt?: string | null
    username?: string | null
  }
}