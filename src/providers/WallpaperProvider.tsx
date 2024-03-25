import { CssVarsProvider } from "@mui/joy";

const WallpaperProvider = ({ children }: { children: React.ReactNode }) => {
  return <CssVarsProvider>{children}</CssVarsProvider>;
};

export default WallpaperProvider;
