export interface UserState {
  emailAddress: string;
  id: string;
  isAuth: boolean;
  jwtToken: string;
}

export type UserRaw =
  | {
      emailAddress: string;
      imgSrc: string | null;
      id: number;
      firstName: string | null;
      lastName: string | null;
      password: string;
    }
  | null
  | undefined;

export type User = NonNullable<UserRaw>;
