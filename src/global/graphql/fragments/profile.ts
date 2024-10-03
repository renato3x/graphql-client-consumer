import { gql } from '@apollo/client';

export const PROFILE_FRAGMENT = gql`
  fragment ProfileFields on Profile {
    id
    name
    label
  }
`