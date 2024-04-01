import { Box, Grid, Skeleton } from "@mui/joy";

const InvoiceLoadingSkeleton = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {[...new Array(9)].map((_, idx) => (
          <Grid
            key={idx}
            xs={12}
            md={idx !== 0 ? 6 : undefined}
            lg={idx !== 0 ? 4 : undefined}
          >
            <Skeleton variant="text" level="h1" />
          </Grid>
        ))}
      </Grid>
      <Box my={2}>
        <Skeleton variant="text" level="h1" sx={{ width: "50%" }} height={50} />
      </Box>
      <Box my={2}>
        <Skeleton variant="text" level="h1" height={50} />
      </Box>
      <Box my={2}>
        <Skeleton variant="text" level="h1" height={50} />
      </Box>
      <Box my={2}>
        <Skeleton variant="text" level="h1" height={50} />
      </Box>
    </Box>
  );
};

export default InvoiceLoadingSkeleton;
