import React, { useContext, useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Avatar from "@mui/joy/Avatar";
import CircularProgress from "@mui/joy/CircularProgress";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import AuthContext from "@src/context/auth/AuthContext";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    photoUrl: "",
    role: "",
    contact: "",
    email: "",
  });

  const authContext = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((profile) => ({
      ...profile,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await authContext.updateUser(
      profile.name,
      profile.contact,
      profile.email,
      profile.role,
      profile.photoUrl
    );
    setIsLoading(false);
    setIsEditing(false);
  };

  useEffect(() => {
    if (authContext.user) {
      const [photoUrl, role, contact] = (
        authContext.user.photoURL as string
      ).split("|||");
      setProfile({
        name: authContext.user?.displayName ?? "",
        photoUrl,
        role,
        contact,
        email: authContext.user?.email ?? "",
      });
    }
  }, [authContext.user]);

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg">Personal Info</Typography>
            <Typography level="body-sm">
              Customize your profile information.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt="Profile" loading="lazy" />
                ) : (
                  <Avatar />
                )}
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                  disabled={!isEditing || isLoading}
                >
                  <Input
                    size="sm"
                    placeholder="Full Name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>Contact</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                  disabled={!isEditing || isLoading}
                >
                  <Input
                    size="sm"
                    placeholder="Phone"
                    name="contact"
                    value={profile.contact}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl
                  sx={{ flexGrow: 1 }}
                  disabled={!isEditing || isLoading}
                >
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Email"
                    sx={{ flexGrow: 1 }}
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl disabled={!isEditing}>
                  <FormLabel>Role</FormLabel>
                  <Input
                    size="sm"
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                    disabled={!isEditing || isLoading}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                >
                  {profile.photoUrl ? (
                    <img src={profile.photoUrl} alt="Profile" loading="lazy" />
                  ) : (
                    <Avatar />
                  )}
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 85,
                    top: 180,
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                  disabled={!isEditing || isLoading}
                >
                  <Input
                    size="sm"
                    placeholder="Full Name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <FormLabel>Contact</FormLabel>
              <FormControl
                sx={{
                  display: { sm: "flex-column", md: "flex-row" },
                  gap: 2,
                }}
                disabled={!isEditing}
              >
                <Input
                  size="sm"
                  placeholder="Phone"
                  name="contact"
                  value={profile.contact}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ flexGrow: 1 }} disabled={!isEditing}>
                <FormLabel>Email</FormLabel>
                <Input
                  size="sm"
                  type="email"
                  startDecorator={<EmailRoundedIcon />}
                  placeholder="Email"
                  defaultValue=""
                  sx={{ flexGrow: 1 }}
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled
                />
              </FormControl>
            </Stack>
            <FormControl disabled={!isEditing || isLoading}>
              <FormLabel>Role</FormLabel>
              <Input
                size="sm"
                name="role"
                value={profile.role}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    onClick={handleSave}
                    startDecorator={
                      isLoading ? <CircularProgress /> : <SaveRoundedIcon />
                    }
                    disabled={isLoading}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="solid"
                  onClick={() => setIsEditing(true)}
                  startDecorator={<EditRoundedIcon />}
                >
                  Edit
                </Button>
              )}
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
};

export default MyProfile;
