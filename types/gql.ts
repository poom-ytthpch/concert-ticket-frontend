export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type ActivityLogGql = {
  __typename?: 'ActivityLogGql';
  concert?: Maybe<ConcertGql>;
  concertId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserGql>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ActivityLogsInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CancelInput = {
  concertId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CancelResponse = {
  __typename?: 'CancelResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type CommonResponse = {
  __typename?: 'CommonResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type ConcertGql = {
  __typename?: 'ConcertGql';
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  reservations?: Maybe<Array<Maybe<ReservationsGql>>>;
  seatsAvailable?: Maybe<Scalars['Int']['output']>;
  totalSeats?: Maybe<Scalars['Int']['output']>;
  userReservationStatus?: Maybe<ReservationStatus>;
};

export type ConcertSummary = {
  __typename?: 'ConcertSummary';
  cancelled?: Maybe<Scalars['Int']['output']>;
  reserved?: Maybe<Scalars['Int']['output']>;
  totalSeat?: Maybe<Scalars['Int']['output']>;
};

export type CreateConcertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  totalSeats: Scalars['Int']['input'];
};

export type CreateConcertResponse = {
  __typename?: 'CreateConcertResponse';
  data?: Maybe<ConcertGql>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type GetConcertsInput = {
  isAdmin: Scalars['Boolean']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetConcertsResponse = {
  __typename?: 'GetConcertsResponse';
  data?: Maybe<Array<Maybe<ConcertGql>>>;
  summary?: Maybe<ConcertSummary>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancel: CancelResponse;
  createConcert: CreateConcertResponse;
  deleteConcert: Scalars['Boolean']['output'];
  login: LoginResponse;
  register: RegisterResponse;
  registerUser: RegisterUserResponse;
  reserve: ReserveResponse;
};


export type MutationCancelArgs = {
  input: CancelInput;
};


export type MutationCreateConcertArgs = {
  input: CreateConcertInput;
};


export type MutationDeleteConcertArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationReserveArgs = {
  input: ReserveInput;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  activityLogs?: Maybe<Array<Maybe<ActivityLogGql>>>;
  getConcerts: GetConcertsResponse;
};


export type QueryActivityLogsArgs = {
  input: ActivityLogsInput;
};


export type QueryGetConcertsArgs = {
  input?: InputMaybe<GetConcertsInput>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roles: Array<RoleType>;
  username: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type RegisterUserInput = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegisterUserResponse = {
  __typename?: 'RegisterUserResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export enum ReservationStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Reserved = 'RESERVED',
  SoldOut = 'SOLD_OUT'
}

export type ReservationsGql = {
  __typename?: 'ReservationsGql';
  concertId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ReservationStatus>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ReserveInput = {
  concertId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ReserveResponse = {
  __typename?: 'ReserveResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export enum RoleType {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserGql = {
  __typename?: 'UserGql';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};
