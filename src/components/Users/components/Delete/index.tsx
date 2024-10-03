import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { useState } from 'react';
import { User } from '../../../../models/user';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../../../global/graphql/mutations/user';
import UserDataViewer from '../../../common/UserDataViewer';
import Error from '../../../common/Error';

function Delete() {
  const [ deleteUser, deleteUserMutation ] = useMutation<{ deleteUser: User }>(DELETE_USER, {
    onError(error) {
      const serverErrors = error.graphQLErrors.map((e) => e.message);
      setErrors(serverErrors.length > 0 ? serverErrors : ['An error occurred']);
    },
  });
  const [ errors, setErrors ] = useState<string[]>([]);

  const [ filters, setFilters ] = useState<User>({
    id: '',
    email: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setFilters({
      ...filters,
      [target.name]: target.value,
    });
  }

  const handleClick = async () => {
    await deleteUser({
      variables: {
        filters: {
          id: filters.id ? Number(filters.id) : undefined,
          email: filters.email ? filters.email : undefined,
        }
      }
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            <Stack spacing={2}>
              {errors.map((error, index) => <Error key={index} message={error}/>)}
            </Stack>
            <Card>
              <CardHeader title="Delete user"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Id"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="id"
                    value={filters.id}
                    onChange={handleChange}
                  />
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    size="small"
                    name="email"
                    value={filters.email}
                    onChange={handleChange}
                  />
                  <Button type="button" variant="contained" size="small" color="error" onClick={handleClick}>Delete</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {deleteUserMutation.data?.deleteUser && <UserDataViewer {...deleteUserMutation.data.deleteUser}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Delete;
