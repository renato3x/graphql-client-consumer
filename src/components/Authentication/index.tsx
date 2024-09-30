import { TabContext, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'

function Authentication() {
  const [ tab, setTab ] = useState('register')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  return (
    <Box>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab
              label="Register"
              value="register"
            />
            <Tab
              label="Login"
              value="login"
            />
          </Tabs>
        </Box>

        <TabPanel value="register">
          <Register/>
        </TabPanel>
        <TabPanel value="login">
          <Login/>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Authentication
