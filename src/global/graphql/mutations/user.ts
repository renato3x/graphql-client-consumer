import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';

export const UPDATE_USER = gql`
  mutation (
    $filters: UserFilter!
    $data: UserInput!
  ) {
    updateUser(
      filters: $filters
      data: $data
    ) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;