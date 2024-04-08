import { Typography } from "@mui/joy";
import Box from "@mui/joy/Box";
import { useLocation } from "react-router-dom";

const NotFoundScreen = ({ isAutomated = true }: { isAutomated?: boolean }) => {
  const { pathname } = useLocation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={8}
      sx={{
        height: isAutomated ? "100vh" : undefined,
        width: isAutomated ? "100vw" : undefined,
        flexDirection: { xs: "column-reverse", lg: "row" },
      }}
      p={8}
    >
      <Box>
        <Box display="flex" alignItems="center">
          <b>404.</b>
          <Typography level="body-sm">That's an error.</Typography>
        </Box>
        <Typography level="title-sm" my={2}>
          {`The requested URL ${pathname} was not found on this server.`}
        </Typography>
        <Typography level="body-sm">That's all we know.</Typography>
      </Box>
      <Box>
        <img src="//www.google.com/images/errors/robot.png" alt="Robot" />
      </Box>
    </Box>
  );
};

export default NotFoundScreen;
