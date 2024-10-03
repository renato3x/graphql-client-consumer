import { useQuery } from '@apollo/client'
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Profile } from '../../../../models/profile'
import { GET_PROFILES } from '../../../../global/graphql/queries'

function List() {
  const getProfiles = useQuery<{ profiles: Profile[] }>(GET_PROFILES);

  return (
    <Stack spacing={2}>
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
