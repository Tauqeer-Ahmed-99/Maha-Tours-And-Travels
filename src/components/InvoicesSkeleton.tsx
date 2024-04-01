import Box from "@mui/joy/Box";
import Skeleton from "@mui/joy/Skeleton";
const InvoicesSkeleton = () => {
  return (
    <Box>
      {[...new Array(9)].map((_, idx) => (
        <Box key={idx} my={2}>
          <Skeleton variant="text" level="h1" height={50} />
        </Box>
      ))}
    </Box>
  );
};

export default InvoicesSkeleton;
