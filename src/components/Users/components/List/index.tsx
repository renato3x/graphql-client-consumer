import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { User } from '../../../../models/user'
import { graphql } from '../../../../global/graphql';
import { ApolloError, gql } from '@apollo/client';
import Error from '../../../common/Error';

function List() {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ errors, setErrors ] = useState<string[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await graphql.query({
          query: gql`
            query {
              users {
                id
                name
                email
                profiles {
                  label
                }
              }
            }
          `
        });
  
        setUsers(response.data.users);
      } catch (error) {
        if (error instanceof ApolloError) {
          setErrors(error.graphQLErrors.map(e => e.message));
        } else {
          setErrors(['An error occurred']);
        }
      }
    };

    getUsers();
  }, []);

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        {errors.map((error, index) => <Error key={index} message={error}/>)}
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Profiles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{ user.id }</TableCell>
                <TableCell>{ user.name }</TableCell>
                <TableCell>{ user.email }</TableCell>
                <TableCell>{ user.profiles?.map(p => p.label).join(', ') }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default List
