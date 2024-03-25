import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import FormHelperText from "@mui/joy/FormHelperText";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

import useForm, { FieldValue } from "../hooks/useForm";
import ColorSchemeToggle from "../components/ColorSchemeToggle";
import { isEmail } from "../utilities/utils";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import Dialog from "../components/Dialog";
import { Link } from "react-router-dom";
import { Routes } from "../routes/routes";
import Wallpaper from "@src/components/Wallpaper";
import AuthFooter from "@src/components/AuthFooter";

const LoginScreen = () => {
  const initialValues = {
    name: {
      value: "",
      validate: (name: FieldValue) => (name as string).length < 8,
    },
    phone: {
      value: "",
      validate: (phone: FieldValue) => (phone as string).length !== 10,
    },
    email: {
      value: "",
      validate: (email: FieldValue) => !isEmail(email as string),
    },
    confirmEmail: {
      value: "",
      validate: (email: FieldValue, formValues: any) =>
        email !== formValues.email.value,
    },
    password: {
      value: "",
      validate: (password: FieldValue) => (password as string).length < 8,
    },
    confirmPassword: {
      value: "",
      validate: (password: FieldValue, formValues: any) =>
        password !== formValues.password.value,
    },
    securityKey: {
      value: "",
      validate: (securityKey: FieldValue) => securityKey !== "123456",
    },
  };

  const [
    formValues,
    formErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
  ] = useForm(initialValues);

  const authContext = useContext(AuthContext);

  const handleSignup = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      authContext.signup(
        (formValues.name as string).trim(),
        (formValues.phone as string).trim(),
        (formValues.email as string).trim(),
        (formValues.password as string).trim(),
        (formValues.securityKey as string).trim()
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Maha Tours and Travels</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 1,
              pb: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 1 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already have an account?{" "}
                  <Link to={Routes.LoginScreen}>Sign in!</Link>
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <form>
                <Stack gap={2} direction={{ xs: "column", lg: "row" }}>
                  <FormControl error={formErrors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={formValues.name as string}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    {formErrors.name && (
                      <FormHelperText sx={{ fontSize: "0.75rem" }}>
                        <InfoOutlined />
                        {(formValues.name as string).trim().length &&
                        (formValues.name as string).trim().length < 8
                          ? "Name must be atleast 8 chars long."
                          : "Please enter a valid Name."}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={formErrors.phone}>
                    <FormLabel>Phone No.</FormLabel>
                    <Input
                      type="tel"
                      name="phone"
                      value={formValues.phone as string}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    {formErrors.phone && (
                      <FormHelperText sx={{ fontSize: "0.75rem" }}>
                        <InfoOutlined />
                        {(formValues.phone as string).trim().length &&
                        (formValues.phone as string).trim().length !== 10
                          ? "Phone No. must be atleast of 10 digits."
                          : "Please enter a valid phone no."}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
                <Stack gap={2} direction={{ xs: "column", lg: "row" }}>
                  <FormControl error={formErrors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formValues.email as string}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    {formErrors.email && (
                      <FormHelperText sx={{ fontSize: "0.75rem" }}>
                        <InfoOutlined />
                        Please enter a valid Email.
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={formErrors.confirmEmail}>
                    <FormLabel>Confirm Email</FormLabel>
                    <Input
                      type="email"
                      name="confirmEmail"
                      value={formValues.confirmEmail as string}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    {formErrors.confirmEmail && (
                      <FormHelperText sx={{ fontSize: "0.75rem" }}>
                        <InfoOutlined />
                        Emails do not match.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
                <Stack gap={2} direction={{ xs: "column", lg: "row" }}>
                  <FormControl error={formErrors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={formValues.password as string}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    {formErrors.password && (
                      <FormHelperText sx={{ fontSize: "0.7rem" }}>
                        <InfoOutlined />
                        {(formValues.password as string).trim().length &&
                        (formValues.password as string).trim().length < 8
                          ? "Password must be atleast 8 chars long."
                          : "Please enter a valid password."}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={formErrors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formValues.confirmPassword as string}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    {formErrors.confirmPassword && (
                      <FormHelperText sx={{ fontSize: "0.75rem" }}>
                        <InfoOutlined />
                        Passwords do not match.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
                <Stack>
                  <FormControl error={formErrors.securityKey}>
                    <FormLabel>Security Key</FormLabel>
                    <Input
                      type="password"
                      name="securityKey"
                      value={formValues.securityKey as string}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    {formErrors.securityKey && (
                      <FormHelperText sx={{ fontSize: "0.75rem" }}>
                        <InfoOutlined />
                        {(formValues.name as string).trim().length
                          ? "Invalid Security Key."
                          : "Please enter security key."}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
                <Stack gap={4} sx={{ mt: 1 }}>
                  <Button onClick={handleSignup} fullWidth>
                    Sign up
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <AuthFooter onSignup />
        </Box>
      </Box>
      <Wallpaper />
      <Dialog />
    </>
  );
};

export default LoginScreen;
