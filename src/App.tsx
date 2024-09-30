import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import Authentication from './components/Authentication';
import Users from './components/Users';
import Profiles from './components/Profiles';

import { useState } from 'react'

function App() {
  const [ tab, setTab ] = useState('auth');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" textTransform="uppercase">
            GraphQL
          </Typography>
          <Typography variant="h6" fontWeight={200} textTransform="uppercase">
            Client 
          </Typography>
        </Toolbar>
      </AppBar>

      <Box>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} centered>
              <Tab
                label="Authentication"
                value="auth"
                icon={<FingerprintIcon/>}
              />
              <Tab
                label="Users"
                value="users"
                icon={<PeopleIcon/>}
              />
              <Tab
                label="Profiles"
                value="profiles"
                icon={<ManageAccountsIcon/>}
              />
            </Tabs>
          </Box>

          <TabPanel value="auth">
            <Authentication/>
          </TabPanel>
          <TabPanel value="users">
            <Users/>
          </TabPanel>
          <TabPanel value="profiles">
            <Profiles/>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}

export default App
