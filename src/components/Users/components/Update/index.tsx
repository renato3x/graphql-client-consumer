import { Box, Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { useState } from 'react';

function Update() {
  const [ selectedProfiles, setSelectedProfiles ] = useState<any[]>([]);
  const profiles = [
    {
      "id" : 1,
      "name" : "common",
      "label" : "Common"
    },
    {
      "id" : 2,
      "name" : "admin",
      "label" : "Administrator"
    },
    {
      "id" : 3,
      "name" : "guest1",
      "label" : "Guest"
    },
    {
      "id" : 4,
      "name" : "guest2",
      "label" : "Guest"
    }
  ];
  

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            <Card>
              <CardHeader title="Filter user"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Id"
                    variant="outlined"
                    type="text"
                    size="small"
                  />
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    size="small"
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
                  />
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    size="small"
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    size="small"
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
                  <Button type="button" variant="contained" size="small">Update user</Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title="Result"/>
            <CardContent>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Update;
