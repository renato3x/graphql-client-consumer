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
`;

export const UPDATE_PROFILE = gql`
  mutation (
    $filters: ProfileFilter!
    $data: ProfileInput!
  ) {
    updateProfile(
      filters: $filters
      data: $data
    ) {
      ...ProfileFields
    }
  }
  ${PROFILE_FRAGMENT}
`;
