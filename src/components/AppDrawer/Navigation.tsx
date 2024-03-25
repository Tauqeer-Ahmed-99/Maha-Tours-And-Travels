import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { useLocation, useNavigate } from "react-router-dom";

import routes from "@src/routes/routes";

export default function Navigation({
  setDrawerOpen,
}: {
  setDrawerOpen?: (open: boolean) => void;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <List size="sm" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
          Browse
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          {routes
            .filter((route) => route.navigation)
            .map((route) => (
              <ListItem key={route.path}>
                <ListItemButton
                  selected={pathname.includes(route.path)}
                  onClick={() => {
                    setDrawerOpen?.(false);
                    navigate(route.path);
                  }}
                >
                  <ListItemDecorator>
                    <route.icon fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>{route.name}</ListItemContent>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </ListItem>
    </List>
  );
}
