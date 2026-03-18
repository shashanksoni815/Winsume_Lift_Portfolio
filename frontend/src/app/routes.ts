import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { Home } from './pages/Home';
import { OurWork } from './pages/OurWork';
import { CollectionPage } from './pages/CollectionPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { InquiryPage } from './pages/InquiryPage';
import { CombinedLoginPage } from './pages/CombinedLoginPage';
import { CreateIdentityPage } from './pages/CreateIdentityPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AdminForgotPasswordPage } from './pages/AdminForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { BespokeProposalPage } from './pages/BespokeProposalPage';
import { InquiryListPage } from './pages/InquiryListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { AllProjectsPage } from './pages/AllProjectsPage';
import { CartPage } from './pages/CartPage';
import { MyEngagementsPage } from './pages/MyEngagementsPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { UserPortal } from './pages/UserPortal';
import { UserSettings } from './pages/UserSettings';
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserManagement } from "./pages/admin/UserManagement";
import { UserDetail } from "./pages/admin/UserDetail";
import { UserPortalConfig } from "./pages/admin/UserPortalConfig";
import { ProjectsManagement } from "./pages/admin/ProjectsManagement";
import { InquiriesManagement } from "./pages/admin/InquiriesManagement";
import { Analytics } from "./pages/admin/Analytics";
import { Notifications } from "./pages/admin/Notifications";
import { AdminProfile } from "./pages/admin/AdminProfile";
import { AdminAccountSettings } from "./pages/admin/AdminAccountSettings";
import { TasksManagement } from "./pages/admin/TasksManagement";
import { EditPage } from "./pages/admin/config/EditPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "our-work",
        Component: OurWork,
      },
      {
        path: "collection",
        Component: CollectionPage,
      },
      {
        path: "services",
        Component: ServicesPage,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "inquiry",
        Component: InquiryPage,
      },
      {
        path: "login",
        Component: CombinedLoginPage,
      },
      {
        path: "admin-login",
        Component: CombinedLoginPage,
      },
      {
        path: "create-identity",
        Component: CreateIdentityPage,
      },
      {
        path: "forgot-password",
        Component: ForgotPasswordPage,
      },
      {
        path: "admin-forgot-password",
        Component: AdminForgotPasswordPage,
      },
      {
        path: "reset-password",
        Component: ResetPasswordPage,
      },
      {
        path: "bespoke-proposal",
        Component: BespokeProposalPage,
      },
      {
        path: "inquiry-list",
        Component: InquiryListPage,
      },
      {
        path: "product/:slug",
        Component: ProductDetailPage,
      },
      {
        path: "project/:id",
        Component: ProjectDetailPage,
      },
      {
        path: "collection-detail/:id",
        Component: CollectionDetailPage,
      },
      {
        path: "all-projects",
        Component: AllProjectsPage,
      },
      {
        path: "cart",
        Component: CartPage,
      },
      {
        path: "my-engagements",
        Component: MyEngagementsPage,
      },
      {
        path: "thank-you",
        Component: ThankYouPage,
      },
      {
        path: "user-portal",
        Component: UserPortal,
      },
      {
        path: "user-settings",
        Component: UserSettings,
      },
      {
        path: "admin-dashboard",
        Component: AdminDashboard,
      },
      {
        path: "admin/users",
        Component: UserManagement,
      },
      {
        path: "admin/user-detail/:id",
        Component: UserDetail,
      },
      {
        path: "admin/portal-config",
        Component: UserPortalConfig,
      },
      {
        path: "admin/projects",
        Component: ProjectsManagement,
      },
      {
        path: "admin/inquiries",
        Component: InquiriesManagement,
      },
      {
        path: "admin/analytics",
        Component: Analytics,
      },
      {
        path: "admin/notifications",
        Component: Notifications,
      },
      {
        path: "admin/profile",
        Component: AdminProfile,
      },
      {
        path: "admin/account-settings",
        Component: AdminAccountSettings,
      },
      {
        path: "admin/tasks",
        Component: TasksManagement,
      },
      {
        path: "admin/config/pages/edit/:id",
        Component: EditPage,
      },
      {
        path: "*",
        Component: Home,
      },
    ],
  },
]);