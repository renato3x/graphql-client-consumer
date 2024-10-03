import { gql } from '@apollo/client';
import { PROFILE_FRAGMENT } from '../fragments';

export const CREATE_PROFILE = gql`
  mutation (
    $data: ProfileInput!
  ) {
    newProfile(
      data: $data
    ) {
      ...ProfileFields
    }
  }
  ${PROFILE_FRAGMENT}
`