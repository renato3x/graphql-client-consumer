import { Stack, Typography } from '@mui/material';
import { Profile } from '../../../models/profile';

function ProfileDataViewer(props: Profile) {
  return (
    <Stack>
      <Typography>
        #: { props.id }
      </Typography>
      <Typography>
        Name: { props.name }
      </Typography>
      <Typography>
        Label: { props.label }
      </Typography>
    </Stack>
  )
}

export default ProfileDataViewer;
