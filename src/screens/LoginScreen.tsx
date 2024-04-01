import { useContext, useState } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import FormHelperText from "@mui/joy/FormHelperText";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import useForm, { FieldValue } from "@src/hooks/useForm";
import ColorSchemeToggle from "@src/components/ColorSchemeToggle";
import Dialog from "@src/components/Dialog";
import AuthContext from "@src/context/auth/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "../routes/routes";
import Wallpaper from "@src/components/Wallpaper";
import AuthFooter from "@src/components/AuthFooter";
import { isEmail } from "@src/utilities/utils";

const LoginScreen = () => {
  const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);

  const forgotPassword = Boolean(queryParams.get("forgot-password"));

  const initialValues = {
    email: {
      value: "",
      validate: (email: FieldValue) =>
        forgotPassword
          ? !isEmail(email as string)
          : (email as string).trim().length < 1,
    },

    password: {
      value: "",
      validate: (password: FieldValue) =>
        (password as string).trim().length < 1,
    },

    remember: {
      value: false,
      validate: (remember: FieldValue) => remember === undefined,
    },
  };

  const authContext = useContext(AuthContext);

  const [
    formValues,
    formErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
  ] = useForm(initialValues);

  const handleSignin = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      authContext.signin(
        (formValues.email as string).trim(),
        (formValues.password as string).trim(),
        formValues.remember as boolean,
      );
    }
  };

  const handleGetRecoveryEmail = async () => {
    validateForm();
    const isEmailValid = formErrors.email === false;
    if (isEmailValid) {
      await authContext.sendPasswordRecoveryEmail(
        (formValues.email as string).trim(),
      );

      setRecoveryEmailSent(true);
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
              py: 2,
              pb: 5,
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
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  {forgotPassword ? "Recover Account" : "Sign in"}
                </Typography>
                <Typography level="body-sm">
                  {forgotPassword ? (
                    "Enter Registered email address."
                  ) : (
                    <>
                      New to company?{" "}
                      <Link to={Routes.SignupScreen}>Sign up!</Link>
                    </>
                  )}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form>
                <FormControl error={formErrors.email}>
                  <FormLabel>
                    {forgotPassword ? "Registered Email" : "Email"}
                  </FormLabel>
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
                      Please enter an email.
                    </FormHelperText>
                  )}
                  {recoveryEmailSent &&
                    authContext.message === "Password Recovery Email Sent." && (
                      <FormHelperText
                        sx={{ fontSize: "0.75rem", color: "green" }}
                      >
                        <InfoOutlined color="success" />
                        {authContext.message} If it is a valid registered email.
                      </FormHelperText>
                    )}
                </FormControl>
                {!forgotPassword && (
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
                      <FormHelperText sx={{ fontSize: "0.75rem" }}>
                        <InfoOutlined />
                        Please enter a password.
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
                {!forgotPassword ? (
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        size="sm"
                        label="Remember me"
                        name="remember"
                        checked={formValues.remember as boolean}
                        onChange={handleInputChange}
                      />
                      <Link to="?forgot-password=true">
                        Forgot your password?
                      </Link>
                    </Box>
                    <Button onClick={handleSignin} fullWidth>
                      Sign in
                    </Button>
                  </Stack>
                ) : (
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Button onClick={handleGetRecoveryEmail} fullWidth>
                      Get Recovery Email
                    </Button>
                  </Stack>
                )}
              </form>
            </Stack>
          </Box>
          <AuthFooter />
        </Box>
      </Box>
      <Wallpaper />
      <Dialog />
    </>
  );
};

export default LoginScreen;
