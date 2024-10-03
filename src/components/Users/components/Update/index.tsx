import { Box, Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { useState } from 'react';
import { GET_PROFILES } from '../../../../global/graphql/queries';
import { Profile } from '../../../../models/profile';
import { useMutation, useQuery } from '@apollo/client';
import { User } from '../../../../models/user';
import { UPDATE_USER } from '../../../../global/graphql/mutations';
import UserDataViewer from '../../../common/UserDataViewer';
import Error from '../../../common/Error';

function Update() {
  const getProfileQuery = useQuery<{ profile: Profile[] }>(GET_PROFILES, {
    onError(error) {
      const serverErrors = error.graphQLErrors.map((e) => e.message);
      setErrors(serverErrors.length > 0 ? serverErrors : ['An error occurred']);
    },
  });
  const [ updateUser, updateUserMutation ] = useMutation<{ updateUser: User }>(UPDATE_USER, {
    onError(error) {
      const serverErrors = error.graphQLErrors.map((e) => e.message);
      setErrors(serverErrors.length > 0 ? serverErrors : ['An error occurred']);
    },
  });
  const [ selectedProfiles, setSelectedProfiles ] = useState<any[]>([]);
  const [ filters, setFilters ] = useState<User>({
    id: '',
    email: '',
  });
  const [ user, setUser ] = useState<Partial<User>>({});
  const [ errors, setErrors ] = useState<string[]>([]);

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

  const handleChangeFilters = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setFilters({
      ...filters,
      [target.name]: target.value,
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  const handleUserUpdate = async () => {
    await updateUser({
      variables: {
        filters: {
          id: filters.id ? Number(filters.id) : undefined,
          email: filters.email ? filters.email : undefined,
        },
        data: {
          ...user,
          profiles: selectedProfiles.map((p) => ({ id: p.id }))
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
              <Stack spacing={2}>
                {errors.map((error, index) => <Error key={index} message={error}/>)}
              </Stack>
              <Card>
                <CardHeader title="Filter user"/>
                <CardContent>
                  <Stack spacing={2}>
                    <TextField
                      label="Id"
                      variant="outlined"
                      type="text"
                      size="small"
                      value={filters.id}
                      name="id"
                      onChange={handleChangeFilters}
                    />
                    <TextField
                      label="E-mail"
                      variant="outlined"
                      type="email"
                      size="small"
                      value={filters.email}
                      name="email"
                      onChange={handleChangeFilters}
                    />
                  </Stack>
                </CardContent>
              </Card>
              <Card>
                <CardHeader title="Update user"/>
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
                        {getProfileQuery.data?.profile?.map((profile, index) => (
                          <MenuItem key={index} onClick={() => handleClick(profile)}>
                            {profile.id} - {profile.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button type="button" variant="contained" size="small" onClick={handleUserUpdate}>Update user</Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {updateUserMutation.data?.updateUser && <UserDataViewer {...updateUserMutation.data.updateUser}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Update;
