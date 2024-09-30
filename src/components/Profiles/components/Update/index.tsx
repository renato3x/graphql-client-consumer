import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'

function Update() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Stack spacing={2}>
            <Card>
              <CardHeader title="Filter Profile"/>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Id"
                    variant="outlined"
                    type="text"
                    size="small"
                  />
                  <TextField
                    label="Name"
                    variant="outlined"
                    type="text"
                    size="small"
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
                  />
                  <TextField
                    label="Label"
                    variant="outlined"
                    type="text"
                    size="small"
                  />
                  <Button type="button" variant="contained" size="small">Update profile</Button>
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
