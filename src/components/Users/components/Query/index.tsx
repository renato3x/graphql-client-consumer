import { Box, Button, Card, CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { User } from '../../../../models/user';
import { graphql } from '../../../../global/graphql';
import { ApolloError, gql } from '@apollo/client';
import Error from '../../../common/Error';
import { useState } from 'react';
import UserDataViewer from '../../../common/UserDataViewer';

function Query() {
  const [ queryForm, setQueryForm ] = useState<User>({
    id: '',
    email: '',
  });
  const [ user, setUser ] = useState<User>();
  const [ errors, setErrors ] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setQueryForm({
      ...queryForm,
      [target.name]: target.value,
    });
  }

  const handleClick = async () => {
    try {
      const response = await graphql.query({
        query: gql`
          query (
            $filters: UserFilter!
          ) {
            user(
              filters: $filters
            ) {
              id
              name
              email
              profiles {
                label
              }
            }
          }
        `,
        variables: {
          filters: {
            id: queryForm.id ? Number(queryForm.id) : undefined,
            email: queryForm.email ? queryForm.email : undefined,
          }
        }
      });

      setUser(response.data.user);
    } catch (error) {
      if (error instanceof ApolloError) {
        setErrors(error.graphQLErrors.map(e => e.message));
      } else {
        setErrors(['An error occurred']);
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            <Stack>
              {errors.map((error, index) => <Error key={index} message={error}/>)}
            </Stack>
            <Card>
              <CardHeader title="Query user"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Id"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="id"
                    value={queryForm.id}
                    onChange={handleChange}
                  />
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    size="small"
                    name="email"
                    value={queryForm.email}
                    onChange={handleChange}
                  />
                  <Button type="button" variant="contained" size="small" onClick={handleClick}>Search</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {!user ? <Typography>User not found</Typography> : <UserDataViewer {...user}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Query;
