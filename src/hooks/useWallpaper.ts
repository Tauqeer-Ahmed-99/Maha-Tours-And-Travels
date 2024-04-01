import { useEffect, useState } from "react";
import { useColorScheme } from "@mui/joy/styles";

import Kaaba1 from "@src/assets/haramain-sharifain/Masjid-al-Haram/kaaba-1.jpg";
import Kaaba2 from "@src/assets/haramain-sharifain/Masjid-al-Haram/kaaba-2.jpg";
import Kaaba3 from "@src/assets/haramain-sharifain/Masjid-al-Haram/kaaba-3.jpg";
import Kaaba4 from "@src/assets/haramain-sharifain/Masjid-al-Haram/kaaba-4.jpg";
import MasjidUnNabawai1 from "@src/assets/haramain-sharifain/Masjid-un-Nabawi/masjid-un-nabawi-1.jpeg";
import MasjidUnNabawai2 from "@src/assets/haramain-sharifain/Masjid-un-Nabawi/masjid-un-nabawi-2.jpg";
import MasjidUnNabawai3 from "@src/assets/haramain-sharifain/Masjid-un-Nabawi/masjid-un-nabawi-3.jpeg";
import MasjidUnNabawai4 from "@src/assets/haramain-sharifain/Masjid-un-Nabawi/masjid-un-nabawi-4.jpg";

const kaabaImages = [Kaaba1, Kaaba2, Kaaba3, Kaaba4];
const masjidUnNabawiImages = [
  MasjidUnNabawai1,
  MasjidUnNabawai2,
  MasjidUnNabawai3,
  MasjidUnNabawai4,
];

const getRandomWallpaper = (wallpapers: string[]) => {
  const randomIndex = Math.floor(Math.random() * wallpapers.length);
  return wallpapers[randomIndex];
};

const useWallpaper = () => {
  const { mode } = useColorScheme();

  const [wallpaper, setWallpaper] = useState(
    mode === "light" ? MasjidUnNabawai1 : Kaaba1,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWallpaper(
        getRandomWallpaper(
          mode === "light" ? masjidUnNabawiImages : kaabaImages,
        ),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [mode]);

  return wallpaper;
};

export default useWallpaper;
