import { gql } from '@apollo/client';
import { PROFILE_FRAGMENT } from '../fragments/profile';

export const GET_PROFILES = gql`
  query {
    profiles {
      ...ProfileFields
    }
  }
  ${PROFILE_FRAGMENT}
`

export const GET_PROFILE = gql`
  query (
    $filters: ProfileFilter!
  ) {
    profile(
      filters: $filters
    ) {
      ...ProfileFields
    }
  }
  ${PROFILE_FRAGMENT}
`
