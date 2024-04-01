import Box from "@mui/joy/Box";
import useWallpaper from "@src/hooks/useWallpaper";

const Wallpaper = () => {
  const wallpaper = useWallpaper();
  return (
    <Box
      sx={{
        height: "100%",
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        left: { xs: 0, md: "50vw" },
        transition:
          "background-image var(--Transition-duration), left var(--Transition-duration) !important",
        transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
        backgroundColor: "background.level1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${wallpaper})`,
      }}
    />
  );
};

export default Wallpaper;
