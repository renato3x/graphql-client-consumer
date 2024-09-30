import { TabContext, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import List from './components/List'
import Query from './components/Query'
import New from './components/New'
import Update from './components/Update'
import Delete from './components/Delete'

function Profiles() {
  const [ tab, setTab ] = useState('list')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  return (
    <Box>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab
              label="List"
              value="list"
            />
            <Tab
              label="Query"
              value="query"
            />
            <Tab
              label="New"
              value="new"
            />
            <Tab
              label="Update"
              value="update"
            />
            <Tab
              label="Delete"
              value="delete"
            />
          </Tabs>
        </Box>

        <TabPanel value="list">
          <List/>
        </TabPanel>
        <TabPanel value="query">
          <Query/>
        </TabPanel>
        <TabPanel value="new">
          <New/>
        </TabPanel>
        <TabPanel value="update">
          <Update/>
        </TabPanel>
        <TabPanel value="delete">
          <Delete/>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Profiles
