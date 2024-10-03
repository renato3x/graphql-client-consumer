import { useMutation } from '@apollo/client';
import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { Profile } from '../../../../models/profile';
import { UPDATE_PROFILE } from '../../../../global/graphql/mutations';
import { useState } from 'react';
import Error from '../../../common/Error';
import ProfileDataViewer from '../../../common/ProfileDataViewer';

function Update() {
  const [ updateProfile, updateProfileMutation ] = useMutation<{ updateProfile: Profile }>(UPDATE_PROFILE, {
    onError(error) {
      const serverErrors = error.graphQLErrors.map((e) => e.message);
      setErrors(serverErrors.length > 0 ? serverErrors : ['An error occurred']);
    },
  });
  const [ errors, setErrors ] = useState<string[]>([]);
  const [ filters, setFilters ] = useState<Partial<Profile>>({
    id: '',
    name: '',
  });
  const [ profile, setProfile ] = useState<Partial<Profile>>();

  const handleChangeFilters = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setFilters({
      ...filters,
      [target.name]: target.value,
    });
  }

  const handleChangeProfile = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setProfile({
      ...profile,
      [target.name]: target.value,
    });
  }

  const handleClick = async () => {
    await updateProfile({
      variables: {
        filters: {
          id: filters.id ? Number(filters.id) : undefined,
          name: filters.name ? filters.name : undefined,
        },
        data: {
          name: profile?.name ? profile.name : undefined,
          label: profile?.label ? profile.label : undefined,
        }
      }
    })
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
              <CardHeader title="Filter Profile"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Id"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="id"
                    value={filters.id}
                    onChange={handleChangeFilters}
                  />
                  <TextField
                    label="Name"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="name"
                    value={filters.name}
                    onChange={handleChangeFilters}
                  />
                </Stack>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Update Profile"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="name"
                    defaultValue={''}
                    value={profile?.name}
                    onChange={handleChangeProfile}
                  />
                  <TextField
                    label="Label"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="label"
                    defaultValue={''}
                    value={profile?.label}
                    onChange={handleChangeProfile}
                  />
                  <Button type="button" variant="contained" size="small" onClick={handleClick}>Update profile</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {updateProfileMutation.data?.updateProfile && <ProfileDataViewer {...updateProfileMutation.data.updateProfile}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Update;
