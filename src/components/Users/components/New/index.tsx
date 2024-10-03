import { Box, Button, Card, CardContent, CardHeader, FormControl, InputLabel, Select, Stack, TextField, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useEffect, useState } from 'react'
import { Profile } from '../../../../models/profile';
import { graphql } from '../../../../global/graphql';
import { ApolloError, gql } from '@apollo/client';
import Error from '../../../common/Error';
import { USER_FRAGMENT } from '../../../../global/graphql/fragments';
import { User } from '../../../../models/user';
import UserDataViewer from '../../../common/UserDataViewer';

function New() {
  const [ selectedProfiles, setSelectedProfiles ] = useState<Profile[]>([]);
  const [ profiles, setProfiles ] = useState<Profile[]>([]);
  const [ errors, setErrors ] = useState<string[]>([]);
  const [ registerResponse, setRegisterResponse ] = useState<User>();
  const [ user, setUser ] = useState<User>({
    name: '',
    email: '',
    password: '',
    profiles: [],
  })

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await graphql.query({
          query: gql`{ profiles { id name label } }`,
        });
  
        setProfiles(response.data.profiles);
      } catch (error) {
        if (error instanceof ApolloError) {
          setErrors(error.graphQLErrors.map(e => e.message));
        } else {
          setErrors(['An error occurred']);
        }
      }
    };

    getProfiles();
  }, []);

  const handleClick = (option: any) => {
    const selectedProfilesClone = JSON.parse(JSON.stringify(selectedProfiles));

    const profileIndex = selectedProfilesClone.findIndex((p: any) => p.name === option.name);

    if (profileIndex != -1) {
      selectedProfilesClone.splice(profileIndex, 1);
    } else {
      selectedProfilesClone.push(option);
    }

    setSelectedProfiles(selectedProfilesClone);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  const handleButtonClick = async () => {
    try {
      const response = await graphql.mutate({
        mutation: gql`
          mutation (
            $data: UserInput!
          ) {
            newUser(
              data: $data
            ) {
              ...UserFields
            }
          }
          ${USER_FRAGMENT}
        `,
        variables: {
          data: {
            ...user,
            profiles: selectedProfiles.map((p) => ({ id: p.id }))
          }
        }
      });

      setRegisterResponse(response.data.newUser);
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
              <CardHeader title="New user"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="name"
                    onChange={handleChange}
                  />
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    size="small"
                    name="email"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    size="small"
                    name="password"
                    onChange={handleChange}
                  />
                  <FormControl>
                    <InputLabel id="profile-select-label">Profiles</InputLabel>
                    <Select
                      labelId="profile-select-label"
                      id="profile-select"
                      value={selectedProfiles}
                      size="small"
                      label="Profiles"
                      multiple
                      renderValue={(selected) => selected.map((option) => `${option.id} - ${option.label}`).join(', ')}
                    >
                      {profiles.map((profile, index) => (
                        <MenuItem key={index} onClick={() => handleClick(profile)}>
                          {profile.id} - {profile.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button type="button" variant="contained" size="small" onClick={handleButtonClick}>Create user</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {registerResponse && <UserDataViewer {...registerResponse}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default New
