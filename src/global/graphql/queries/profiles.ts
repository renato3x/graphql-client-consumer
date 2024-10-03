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