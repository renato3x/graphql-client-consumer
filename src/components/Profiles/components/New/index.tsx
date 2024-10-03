import { useMutation } from '@apollo/client'
import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { CREATE_PROFILE } from '../../../../global/graphql/mutations'
import { Profile } from '../../../../models/profile';
import React, { useState } from 'react';
import Error from '../../../common/Error';
import ProfileDataViewer from '../../../common/ProfileDataViewer';

function New() {
  const [ newProfile, newProfileMutation ] = useMutation<{ newProfile: Profile }>(CREATE_PROFILE, {
    onError(error) {
      const serverErrors = error.graphQLErrors.map((e) => e.message);
      setErrors(serverErrors.length > 0 ? serverErrors : ['An error occurred']);
    },
  });
  const [ profile, setProfile ] = useState<Profile>({
    name: '',
    label: '',
  });
  const [ errors, setErrors ] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;
    setProfile({
      ...profile,
      [target.name]: target.value,
    })
  }

  const handleClick = async () => {
    await newProfile({
      variables: {
        data: profile,
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            <Stack spacing={2}>
              {errors.map((error, index) => <Error key={index} message={error}/>)}
            </Stack>
            <Card>
              <CardHeader title="New Profile"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Label"
                    variant="outlined"
                    type="text"
                    size="small"
                    name="label"
                    value={profile.label}
                    onChange={handleChange}
                  />
                  <Button type="button" variant="contained" size="small" onClick={handleClick}>Create profile</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {newProfileMutation.data?.newProfile && <ProfileDataViewer {...newProfileMutation.data.newProfile}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default New
