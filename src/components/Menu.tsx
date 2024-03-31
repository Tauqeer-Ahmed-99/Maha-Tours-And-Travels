import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";

export interface GroupMenuEvent {
  target: {
    name: string;
    value: string;
  };
}

export default function GroupMenu({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}) {
  return (
    <Dropdown>
      <MenuButton
        endDecorator={<ArrowDropDown />}
        sx={{ width: "100%", textAlign: "start" }}
      >
        {selectedOption}
      </MenuButton>
      <Menu sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              setSelectedOption(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
}
