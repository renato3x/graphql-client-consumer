import { useQuery } from '@apollo/client'
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Profile } from '../../../../models/profile'
import { GET_PROFILES } from '../../../../global/graphql/queries'
import { useState } from 'react';
import Error from '../../../common/Error';

function List() {
  const getProfiles = useQuery<{ profiles: Profile[] }>(GET_PROFILES, {
    onError(error) {
      const serverErrors = error.graphQLErrors.map((e) => e.message);
      setErrors(serverErrors.length > 0 ? serverErrors : ['An error occurred']);
    },
  });
  const [ errors, setErrors ] = useState<string[]>([]);

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        {errors.map((error, index) => <Error key={index} message={error}/>)}
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection="asc">#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Label</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getProfiles.data?.profiles?.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>{ profile.id }</TableCell>
                <TableCell>{ profile.name }</TableCell>
                <TableCell>{ profile.label }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default List
