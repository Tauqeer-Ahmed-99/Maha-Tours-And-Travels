import Grid from "@mui/joy/Grid";
import AspectRatio from "@mui/joy/AspectRatio";
import Skeleton from "@mui/joy/Skeleton";

const DashboardSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {[...new Array(9)].map((_, idx) => (
        <Grid
          key={idx}
          xs={12}
          md={idx !== 0 ? 6 : undefined}
          lg={idx !== 0 ? 4 : undefined}
        >
          <AspectRatio minHeight="120px" maxHeight="120px">
            <Skeleton animation="wave">
              <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </Skeleton>
          </AspectRatio>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardSkeleton;
