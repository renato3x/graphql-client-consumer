import { useLazyQuery } from '@apollo/client';
import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { GET_PROFILE } from '../../../../global/graphql/queries';
import { Profile } from '../../../../models/profile';
import { useState } from 'react';
import ProfileDataViewer from '../../../common/ProfileDataViewer';

function Query() {
  const [ getProfile, getProfileQuery ] = useLazyQuery<{ profile: Profile }>(GET_PROFILE);
  const [ filters, setFilters ] = useState<Partial<Profile>>({
    id: '',
    name: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    setFilters({
      ...filters,
      [target.name]: target.value,
    });
  }

  const handleClick = async () => {
    await getProfile({
      variables: {
        filters: {
          id: filters.id ? Number(filters.id) : undefined,
          name: filters.name ? filters.name : undefined,
        }
      }
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Card>
            <CardHeader title="Query Profile"/>
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
                <Button type="button" variant="contained" size="small" onClick={handleClick}>Search</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
              {getProfileQuery.data?.profile && <ProfileDataViewer {...getProfileQuery.data.profile}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Query;
