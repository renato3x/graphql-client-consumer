import { Stack, Typography } from '@mui/material';
import { User } from '../../../models/user';

function UserDataViewer(props: User) {
  return (
    <Stack>
      <Typography>
        #: { props.id }
      </Typography>
      <Typography>
        Name: { props.name }
      </Typography>
      <Typography>
        Email: { props.email }
      </Typography>
      <Typography>
        Profiles: { props?.profiles?.map((p) => p.label).join(', ') }
      </Typography>
    </Stack>
  )
}

export default UserDataViewer;
