import DashboardScreen from "../screens/DashboardScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";

import InvoicesScreen from "../screens/InvoicesScreen";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import DoNotDisturbRoundedIcon from "@mui/icons-material/DoNotDisturbRounded";
import InvoiceTemplateScreen from "../screens/InvoiceTemplateScreen";
import InvoiceDetailsScreen from "@src/screens/InvoiceDetailsScreen";

export enum Routes {
  HomeScreen = "/",
  SignupScreen = "/signup",
  LoginScreen = "/login",
  DashboardScreen = "/dashboard",
  InvoicesScreen = "/invoices",
  InvoiceDetailsScreen = "/invoices/invoice/:invoiceId",
  InvoicesTemplateScreen = "/template",
  ProfileScreen = "/profile",
  NotFoundScreen = "/*",
}

export interface IRoute {
  name: string;
  path: Routes;
  icon: typeof HomeRoundedIcon;
  screen: React.FC;
  appBar: boolean;
  navigation: boolean;
}

const routes: IRoute[] = [
  {
    name: "Home",
    path: Routes.HomeScreen,
    icon: HomeRoundedIcon,
    screen: LoginScreen,
    appBar: false,
    navigation: false,
  },
  {
    name: "Signup",
    path: Routes.SignupScreen,
    icon: AddCircleRoundedIcon,
    screen: SignupScreen,
    appBar: false,
    navigation: false,
  },
  {
    name: "Login",
    path: Routes.LoginScreen,
    icon: LoginRoundedIcon,
    screen: LoginScreen,
    appBar: false,
    navigation: false,
  },
  {
    name: "Dashboard",
    path: Routes.DashboardScreen,
    icon: SpaceDashboardRoundedIcon,
    screen: DashboardScreen,
    appBar: true,
    navigation: true,
  },
  {
    name: "Invoices",
    path: Routes.InvoicesScreen,
    icon: ReceiptRoundedIcon,
    screen: InvoicesScreen,
    appBar: true,
    navigation: true,
  },
  {
    name: "Create Invoice",
    path: Routes.InvoiceDetailsScreen,
    icon: NoteAddRoundedIcon,
    screen: InvoiceDetailsScreen,
    appBar: true,
    navigation: false,
  },
  {
    name: "Invoice Template",
    path: Routes.InvoicesTemplateScreen,
    icon: ReceiptRoundedIcon,
    screen: InvoiceTemplateScreen,
    appBar: true,
    navigation: true,
  },
  {
    name: "Profile",
    path: Routes.ProfileScreen,
    icon: PersonOutlineRoundedIcon,
    screen: ProfileScreen,
    appBar: true,
    navigation: false,
  },
  {
    name: "Screen Not Found",
    path: Routes.NotFoundScreen,
    icon: DoNotDisturbRoundedIcon,
    screen: NotFoundScreen,
    appBar: false,
    navigation: false,
  },
];

export default routes;
