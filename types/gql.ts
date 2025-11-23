import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type Cancelresponse = {
  __typename?: 'Cancelresponse';
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
  cancel: Cancelresponse;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ActivityLogGql: ResolverTypeWrapper<ActivityLogGql>;
  ActivityLogsInput: ActivityLogsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CancelInput: CancelInput;
  Cancelresponse: ResolverTypeWrapper<Cancelresponse>;
  CommonResponse: ResolverTypeWrapper<CommonResponse>;
  ConcertGql: ResolverTypeWrapper<ConcertGql>;
  ConcertSummary: ResolverTypeWrapper<ConcertSummary>;
  CreateConcertInput: CreateConcertInput;
  CreateConcertResponse: ResolverTypeWrapper<CreateConcertResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  GetConcertsInput: GetConcertsInput;
  GetConcertsResponse: ResolverTypeWrapper<GetConcertsResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RegisterInput: RegisterInput;
  RegisterResponse: ResolverTypeWrapper<RegisterResponse>;
  RegisterUserInput: RegisterUserInput;
  RegisterUserResponse: ResolverTypeWrapper<RegisterUserResponse>;
  ReservationStatus: ReservationStatus;
  ReservationsGql: ResolverTypeWrapper<ReservationsGql>;
  ReserveInput: ReserveInput;
  ReserveResponse: ResolverTypeWrapper<ReserveResponse>;
  RoleType: RoleType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserGql: ResolverTypeWrapper<UserGql>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ActivityLogGql: ActivityLogGql;
  ActivityLogsInput: ActivityLogsInput;
  Boolean: Scalars['Boolean']['output'];
  CancelInput: CancelInput;
  Cancelresponse: Cancelresponse;
  CommonResponse: CommonResponse;
  ConcertGql: ConcertGql;
  ConcertSummary: ConcertSummary;
  CreateConcertInput: CreateConcertInput;
  CreateConcertResponse: CreateConcertResponse;
  Date: Scalars['Date']['output'];
  GetConcertsInput: GetConcertsInput;
  GetConcertsResponse: GetConcertsResponse;
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  LoginResponse: LoginResponse;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  RegisterInput: RegisterInput;
  RegisterResponse: RegisterResponse;
  RegisterUserInput: RegisterUserInput;
  RegisterUserResponse: RegisterUserResponse;
  ReservationsGql: ReservationsGql;
  ReserveInput: ReserveInput;
  ReserveResponse: ReserveResponse;
  String: Scalars['String']['output'];
  UserGql: UserGql;
};

export type ActivityLogGqlResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActivityLogGql'] = ResolversParentTypes['ActivityLogGql']> = {
  concert?: Resolver<Maybe<ResolversTypes['ConcertGql']>, ParentType, ContextType>;
  concertId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserGql']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CancelresponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cancelresponse'] = ResolversParentTypes['Cancelresponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type CommonResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommonResponse'] = ResolversParentTypes['CommonResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ConcertGqlResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConcertGql'] = ResolversParentTypes['ConcertGql']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reservations?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReservationsGql']>>>, ParentType, ContextType>;
  seatsAvailable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSeats?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userReservationStatus?: Resolver<Maybe<ResolversTypes['ReservationStatus']>, ParentType, ContextType>;
};

export type ConcertSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConcertSummary'] = ResolversParentTypes['ConcertSummary']> = {
  cancelled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reserved?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSeat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type CreateConcertResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateConcertResponse'] = ResolversParentTypes['CreateConcertResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['ConcertGql']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GetConcertsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetConcertsResponse'] = ResolversParentTypes['GetConcertsResponse']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['ConcertGql']>>>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['ConcertSummary']>, ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  cancel?: Resolver<ResolversTypes['Cancelresponse'], ParentType, ContextType, RequireFields<MutationCancelArgs, 'input'>>;
  createConcert?: Resolver<ResolversTypes['CreateConcertResponse'], ParentType, ContextType, RequireFields<MutationCreateConcertArgs, 'input'>>;
  deleteConcert?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteConcertArgs, 'id'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  register?: Resolver<ResolversTypes['RegisterResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['RegisterUserResponse'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  reserve?: Resolver<ResolversTypes['ReserveResponse'], ParentType, ContextType, RequireFields<MutationReserveArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  activityLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['ActivityLogGql']>>>, ParentType, ContextType, RequireFields<QueryActivityLogsArgs, 'input'>>;
  getConcerts?: Resolver<ResolversTypes['GetConcertsResponse'], ParentType, ContextType, Partial<QueryGetConcertsArgs>>;
};

export type RegisterResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type RegisterUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterUserResponse'] = ResolversParentTypes['RegisterUserResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ReservationsGqlResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReservationsGql'] = ResolversParentTypes['ReservationsGql']> = {
  concertId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ReservationStatus']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ReserveResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReserveResponse'] = ResolversParentTypes['ReserveResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type UserGqlResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserGql'] = ResolversParentTypes['UserGql']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ActivityLogGql?: ActivityLogGqlResolvers<ContextType>;
  Cancelresponse?: CancelresponseResolvers<ContextType>;
  CommonResponse?: CommonResponseResolvers<ContextType>;
  ConcertGql?: ConcertGqlResolvers<ContextType>;
  ConcertSummary?: ConcertSummaryResolvers<ContextType>;
  CreateConcertResponse?: CreateConcertResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GetConcertsResponse?: GetConcertsResponseResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
  RegisterUserResponse?: RegisterUserResponseResolvers<ContextType>;
  ReservationsGql?: ReservationsGqlResolvers<ContextType>;
  ReserveResponse?: ReserveResponseResolvers<ContextType>;
  UserGql?: UserGqlResolvers<ContextType>;
};

