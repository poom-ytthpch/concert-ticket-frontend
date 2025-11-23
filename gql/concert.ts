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
        reservations {
          id
          userId
          concertId
          status
          createdAt
        }
      }
      summary {
        totalSeat
        reserved
        cancelled
      }
    }
  }
`;
