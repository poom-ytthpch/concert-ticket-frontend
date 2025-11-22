import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      status
      message
      token
    }
  }
`;

export const RegisterUserMutation = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      message
      status
    }
  }
`;
