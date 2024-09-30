import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'

function Register() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Card>
            <CardHeader title="Register"/>
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  variant="outlined"
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
                <Button type="button" variant="contained" size="small">Register</Button>
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

export default Register
