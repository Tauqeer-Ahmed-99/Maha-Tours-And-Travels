import { CssVarsProvider } from "@mui/joy/styles";

const WallpaperProvider = ({ children }: { children: React.ReactNode }) => {
  return <CssVarsProvider>{children}</CssVarsProvider>;
};

export default WallpaperProvider;
