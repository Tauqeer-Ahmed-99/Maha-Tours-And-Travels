import { Box, Typography } from "@mui/joy";

const AuthFooter = ({ onSignup }: { onSignup?: boolean }) => {
  return (
    <Box component="footer" sx={{ py: onSignup ? 1 : 3 }}>
      <Typography level="body-xs" textAlign="center">
        © Maha Tours and Travels {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default AuthFooter;
