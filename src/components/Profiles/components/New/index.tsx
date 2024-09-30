import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'

function New() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Card>
            <CardHeader title="New Profile"/>
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
                <Button type="button" variant="contained" size="small">Create profile</Button>
              </Stack>
            </CardContent>
          </Card>
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

export default New
