import { Box, Button, Card, CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useState } from 'react'
import { User } from '../../../../models/user'
import { graphql } from '../../../../global/graphql';
import { ApolloError, gql } from '@apollo/client';
import Error from '../../../common/Error';

function Login() {
  const [ loginResponse, setLoginResponse ] = useState<User>();
  const [ errors, setErrors ] = useState<string[]>([]);
  const [ user, setUser ] = useState<User>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  const handleClick = async () => {
    try {
      const response = await graphql.query({
        query: gql`
          query (
            $data: UserLoginInput
          ) {
            login(
              data: $data
            ) {
              id
              name
              email
              token
              profiles {
                label
              }
            }
          }
        `,
        variables: {
          data: user,
        },
      });

      setLoginResponse(response.data.login);
      localStorage.setItem('token', response.data.login.token);
    } catch (error) {
      if (error instanceof ApolloError) {
        setErrors(error.graphQLErrors.map(e => e.message));
      } else {
        console.log(error);
        setErrors(['An error occurred']);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            {
              errors.length > 0 && 
              <Stack spacing={1}>
                {errors.map((e, index) => (
                  <Error key={index} message={e}/>
                ))}
              </Stack>
            }
            <Card>
              <CardHeader title="Login"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    size="small"
                    value={user.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    size="small"
                    value={user.password}
                    onChange={handleChange}
                    name="password"
                  />
                  <Button type="button" variant="contained" size="small" onClick={handleClick}>Login</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {
                loginResponse &&
                <Stack>
                  <Typography>
                    #: { loginResponse.id }
                  </Typography>
                  <Typography>
                    Name: { loginResponse.name }
                  </Typography>
                  <Typography>
                    Email: { loginResponse.email }
                  </Typography>
                  <Typography>
                    Profiles: { loginResponse?.profiles?.map((p) => p.label).join(', ') }
                  </Typography>
                </Stack>
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login