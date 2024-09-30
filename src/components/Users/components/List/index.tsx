import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

function List() {
  return (
    <Stack spacing={2}>
      <Box>
        <Button variant="contained">Get users</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection="asc">#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Profiles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default List
