import { Box, Button, Card, CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { User } from '../../../../models/user';
import { useState } from 'react';
import { graphql } from '../../../../global/graphql';
import { ApolloError, gql } from '@apollo/client';
import Error from '../../../common/Error';

function Register() {
  const [ user, setUser ] = useState<User>({
    name: '',
    email: '',
    password: '',
  });
  const [ registerResponse, setRegisterResponse ] = useState<User>();
  const [ errors, setErrors ] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  const handleRegister = async () => {
    try {
      /**
       * Isso na chamada das mutations são variáveis que
       * precisam ser definidas ao utilizar o client do Graphql
       * 
       * Elas definem na mutation as variáveis que serão usadas na mutation
       * para definir os valores que serão passados para os argumentos da mutation
       * 
       * Alternativa de utilização no caso abaixo:
       * 
       * const response = await graphql.mutate({
       *  mutation: gql`
       *    mutation (
       *      $data: RegisterUserInput!
       *    ) {
       *      registerUser(
       *        data: $data
       *      ) {
       *        id
       *        name
       *        email
       *        profiles {
       *          label
       *        }
       *      }
       *    }
       *  `
       * })
       * 
       * As variáveis da mutations podem ser do tipo de inputs ou types criados por você
       * 
       * OBS: O tipo deve ser estritamente igual ao tipo definido na mutation. Se um campo é obrigatório na mutation,
       * o tipo da variável também deve ser obrigatório
       */

      const response = await graphql.mutate({
        mutation: gql`
          mutation (
            $name: String!
            $email: String!
            $password: String!
          ) {
            registerUser(
              data: {
                name: $name
                email: $email
                password: $password
              }
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
        variables: user
      });

      setRegisterResponse(response.data.registerUser);
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
            {
              errors.length > 0 && 
              <Stack spacing={1}>
                {errors.map((e, index) => (
                  <Error key={index} message={e}/>
                ))}
              </Stack>
            }

            <Card>
              <CardHeader title="Register"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={user.name}
                    onChange={handleChange}
                    name="name"
                  />
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
                  <Button type="button" variant="contained" size="small" onClick={handleRegister}>Register</Button>
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
                registerResponse &&
                <Stack>
                  <Typography>
                    #: { registerResponse.id }
                  </Typography>
                  <Typography>
                    Name: { registerResponse.name }
                  </Typography>
                  <Typography>
                    Email: { registerResponse.email }
                  </Typography>
                  <Typography>
                    Profiles: { registerResponse.profiles?.map((p) => p.label).join(', ') }
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

export default Register
