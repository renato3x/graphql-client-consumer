import { Alert } from "@mui/material";

interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  return (
    <>
      <Alert severity="error" variant="standard">
        { message }
      </Alert>
    </>
  )
}

export default Error;
