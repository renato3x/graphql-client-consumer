import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { DELETE_PROFILE } from '../../../../global/graphql/mutations';
import { Profile } from '../../../../models/profile';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Error from '../../../common/Error';
import ProfileDataViewer from '../../../common/ProfileDataViewer';

function Delete() {
  const [ deleteProfile, deleteProfileMutation ] = useMutation<{ deleteProfile: Profile }>(DELETE_PROFILE, {
    onError(error) {
      const serverErrors = error.graphQLErrors.map((e) => e.message);
      setErrors(serverErrors.length > 0 ? serverErrors : ['An error occurred']);
    },
  });

  const [ errors, setErrors ] = useState<string[]>([]);
  const [ filters, setFilters ] = useState<Partial<Profile>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setFilters({
      ...filters,
      [target.name]: target.value,
    });
  }

  const handleClick = async () => {
    await deleteProfile({
      variables: {
        filters: {
          id: filters.id ? Number(filters.id) : undefined,
          name: filters.name ? filters.name : undefined,
        }
      }
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            {errors.map((error, index) => <Error key={index} message={error}/>)}
          </Stack>
          <Card>
            <CardHeader title="Delete Profile"/>
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
                  label="Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  name="name"
                  value={filters.name}
                  onChange={handleChange}
                />
                <Button type="button" variant="contained" size="small" color="error" onClick={handleClick}>Delete</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {deleteProfileMutation.data?.deleteProfile && <ProfileDataViewer {...deleteProfileMutation.data?.deleteProfile}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Delete;
