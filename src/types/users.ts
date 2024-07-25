export interface UserState {
  emailAddress: string;
  id: string;
  isAuth: boolean;
  jwtToken: string;
}

export type UserRaw =
  | {
      password: string;
      emailAddress: string;
      id: number;
      imgSrc: string | null;
    }
  | null
  | undefined;

export type User = NonNullable<UserRaw>;
