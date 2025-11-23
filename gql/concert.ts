import { gql } from "@apollo/client";

export const GetConcertsQuery = gql`
  query GetConcerts($input: GetConcertsInput) {
    getConcerts(input: $input) {
      data {
        id
        name
        description
        totalSeats
        seatsAvailable
        createdAt
        userReservationStatus
      }
      summary {
        totalSeat
        reserved
        cancelled
      }
    }
  }
`;

export const CreateConcertMutation = gql`
  mutation CreateConcert($input: CreateConcertInput!) {
    createConcert(input: $input) {
      data {
        id
        name
        description
        totalSeats
        seatsAvailable
        createdAt
        reservations {
          id
          userId
          concertId
          status
          createdAt
        }
      }
      status
      message
    }
  }
`;

export const DeleteConcertMutation = gql`
  mutation DeleteConcert($id: String!) {
    deleteConcert(id: $id)
  }
`;

export const ReserveMutation = gql`
  mutation Reserve($input: ReserveInput!) {
    reserve(input: $input) {
      status
      message
    }
  }
`;
