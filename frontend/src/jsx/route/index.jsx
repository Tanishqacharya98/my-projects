import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Routes, Route, Outlet } from "react-router-dom";
import Nav from "../layouts/nav";
import Footer from "../layouts/Footer";
// dashboard 
import Home from "../pages/dashboard/Home";
import ProtectedRoute from "./ProtectedRoute";
// import DashboardDark from "../pages/dashboard/DashboardDark";
// import Dashboard2 from "../pages/dashboard/dashboard-2";
// import Projectpage from "../pages/dashboard/project-page";
// import Contact from "../pages/dashboard/contact";
// import Kanban from "../pages/dashboard/kanban";
// import Message from "../pages/dashboard/message";
// CMS 
// import Content from '../pages/cms/content'
// import ContentAdd from "../pages/cms/content-add";
// import Menu from "../pages/cms/menu";
// import EmailTemplate from "../pages/cms/email-template";
// import AddEmail from "../pages/cms/add-email";
// import Blog from "../pages/cms/blog";
// import AddBlog from "../pages/cms/add-blog";
// import BlogCategory from "../pages/cms/blog-category";
// // Profile 
// import ProfileOverview from "../pages/profile/profile-overview";
// import ProfileProjects from "../pages/profile/profile-projects";
// import ProfileProjectsDetails from "../pages/profile/profile-projects-details";
// import ProfileCampaigns from "../pages/profile/profile-campaigns";
// import ProfileDocuments from "../pages/profile/profile-documents";
// import ProfileFollowers from "../pages/profile/profile-followers";
// import ProfileActivity from "../pages/profile/profile-activity";
// // Account 
// import AccountOverview from "../pages/account/account-overview";
// import AccountSettings from "../pages/account/account-settings";
// import AccountSecurity from "../pages/account/account-security";
// import AccountActivity from "../pages/account/account-activity";
// import AccountBilling from "../pages/account/account-billing";
// import AccountStatements from "../pages/account/account-statements";
// import AccountReferrals from "../pages/account/account-referrals";
// import AccountApiKeys from "../pages/account/acount-apikeys";
// import AccountLogs from "../pages/account/account-logs";
// // AIKIT 
// import AutoWrite from "../pages/aikit/auto-write";
// import Scheduled from "../pages/aikit/scheduled";
// import Repurpose from "../pages/aikit/repurpose";
// import RSS from "../pages/aikit/rss";
// import Chatbot from "../pages/aikit/chatbot";
// import FineTuneModels from "../pages/aikit/fine-tune-models";
// import Prompt from "../pages/aikit/prompt";
// import Setting from "../pages/aikit/setting";
// import Import from "../pages/aikit/import";
// // USER 
// import AppProfile from "../pages/apps/app-profile";
// import EditProfile from "../pages/apps/edit-profile";
// import PostDetails from "../pages/apps/post-details";
// // blog 
// import BlogPost from "../pages/blog/blog-post";
// import BlogHome from "../pages/blog/blog-home";
// // pricing 
// import Pricing from "../pages/pricing";
// // ecommers categories
// import CategoryTable from "../pages/ecommerce/categories/category-table";
// import AddCategory from "../pages/ecommerce/categories/add-categary";
// import EditCategory from "../pages/ecommerce/categories/edit-categary";
// // ecommers products
// import ProductTable from "../pages/ecommerce/products/product-table";
// import AddProduct from "../pages/ecommerce/products/add-product";
// import EditProduct from "../pages/ecommerce/products/edit-product";
// // ecommers shop
// import ProductGrid from "../pages/ecommerce/shop/ecom-product-grid";
// import ProductList from "../pages/ecommerce/shop/ecom-product-list";
// import ProductDetail from "../pages/ecommerce/shop/ecom-product-detail";
// import ProductOrder from "../pages/ecommerce/shop/ecom-product-order";
// import Checkout from "../pages/ecommerce/shop/ecom-checkout";
// import Invoice from "../pages/ecommerce/shop/ecom-invoice";
// import Customers from "../pages/ecommerce/shop/ecom-customers";
// // projects
// import ProjectList from "../pages/projects/project-list";
// import AddProject from "../pages/projects/add-project";
// import ProjectCard from "../pages/projects/project-card";
// // notes
// import Notes from "../pages/note";
// // file manager
// import FileManager from "../pages/file-manager";
// // contacts 
// import ContactList from "../pages/contacts/contact-list";
// import ContactCard from "../pages/contacts/contact-card";
// // inbox 
// import EmailCompose from "../pages/email/email-compose";
// import EmailInbox from "../pages/email/email-inbox";
// import EmailRead from "../pages/email/email-read";
// // calender
// import Calendar from "../pages/calender";
// // charts 
// import SparklineChart from "../pages/charts/Sparkline";
// import ChartJs from "../pages/charts/Chartjs";
// import RechartJs from "../pages/charts/rechart";
// import ApexChart from "../pages/charts/apexcharts";
// // bootstrap 
// import UiAccordion from "../components/bootstrap/Accordion";
// import UiAlert from "../components/bootstrap/Alert";
// import UiBadge from "../components/bootstrap/Badge";
// import UiButton from "../components/bootstrap/Button";
// import UiModal from "../components/bootstrap/Modal";
// import UiButtonGroup from "../components/bootstrap/ButtonGroup";
// import UiListGroup from "../components/bootstrap/ListGroup";
// import UiCards from "../components/bootstrap/Cards";
// import UiCarousel from "../components/bootstrap/Carousel";
// import UiDropDown from "../components/bootstrap/DropDown";
// import UiPopOver from "../components/bootstrap/PopOver";
// import UiProgressBar from "../components/bootstrap/ProgressBar";
// import UiTab from "../components/bootstrap/Tab";
// import UiTypography from "../components/bootstrap/Typography";
// import UiPagination from "../components/bootstrap/Pagination";
// import UiGrid from "../components/bootstrap/Grid";
// // plugins 
// import Select2 from "../pages/plugins/Select2/Select2"; 
// import NouiSlider from "../pages/plugins/NouiSlider/MainNouiSlider";
// import MainSweetAlert from "../pages/plugins/SweetAlert/SweetAlert";
// import MainToastr from "../pages/plugins/Toastr/Toastr";
// import Lightgallery from "../pages/plugins/Lightgallery/Lightgallery";
// import Widget from "../pages/widget/Widget";
// // forms 
// import Element from "../pages/forms/Element/Element";
// import Wizard from "../pages/forms/Wizard/Wizard";
// import CkEditor from "../pages/forms/CkEditor/CkEditor";
// import Pickers from "../pages/forms/Pickers/Pickers";
// import FormValidation from "../pages/forms/FormValidation/FormValidation";
// // table 
// import BootstrapTable from "../pages/table/BootstrapTable";
// import DataTable from "../pages/table/DataTable";
// // pages 
// import LockScreen from "../pages/error/LockScreen";
// import Error400 from "../pages/error/Error400";
// import Error403 from "../pages/error/Error403";
// import Error404 from "../pages/error/Error404";
// import Error500 from "../pages/error/Error500";
// import Error503 from "../pages/error/Error503";
// import EmptyPage from "../pages/error/emptypage";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import Logout from "../layouts/nav/Logout";
// import Setting2 from "../layouts/Setting";
import ScrollToTop from "../element/scrolltotop";
import UserList from "../pages/users/UserList";
import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import Profile from "../pages/profile/Profile";
import ChangePassword from "../pages/profile/ChangePassword";
import GoogleSuccess from "../pages/authentication/GoogleSuccess";


const Markup = () => {
    return (
        <>
            <Routes>
                {/* <Route path='page-lock-screen' element={<LockScreen />} />
                <Route path='page-error-400' element={<Error400 />} />
                <Route path='page-error-403' element={<Error403 />} />
                <Route path='page-error-404' element={<Error404 />} />
                <Route path='page-error-500' element={<Error500 />} />
                <Route path='page-error-503' element={<Error503 />} /> */}
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Registration />} />
                <Route path="google-success" element={<GoogleSuccess />} />
                <Route path="logout" element={<Logout />} />
                <Route element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }>

                    <Route path='' element={<Home />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="create-user" element={<CreateUser />} />
                    <Route path="edit-user/:id" element={<EditUser />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    {/* <Route path='dashboard' element={<Home />} />
                    <Route path='dashboard-dark' element={<DashboardDark />} />
                    <Route path='dashboard-2' element={<Dashboard2 />} />
                    <Route path='project-page' element={<Projectpage />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='kanban' element={<Kanban />} />
                    <Route path='message' element={<Message />} />
                    <Route path='content' element={<Content />} />
                    <Route path='content-add' element={<ContentAdd />} />
                    <Route path='menu' element={<Menu />} />
                    <Route path='email-template' element={<EmailTemplate />} />
                    <Route path='add-email' element={<AddEmail />} />
                    <Route path='blog' element={<Blog />} />
                    <Route path='add-blog' element={<AddBlog />} />
                    <Route path='blog-category' element={<BlogCategory />} />
                    <Route path='profile-overview' element={<ProfileOverview />} />
                    <Route path='profile-projects' element={<ProfileProjects />} />
                    <Route path='profile-projects-details' element={<ProfileProjectsDetails />} />
                    <Route path='profile-campaigns' element={<ProfileCampaigns />} />
                    <Route path='profile-documents' element={<ProfileDocuments />} />
                    <Route path='profile-followers' element={<ProfileFollowers />} />
                    <Route path='profile-activity' element={<ProfileActivity />} />
                    <Route path='account-overview' element={<AccountOverview />} />
                    <Route path='account-settings' element={<AccountSettings />} />
                    <Route path='account-security' element={<AccountSecurity />} />
                    <Route path='account-activity' element={<AccountActivity />} />
                    <Route path='account-billing' element={<AccountBilling />} />
                    <Route path='account-statements' element={<AccountStatements />} />
                    <Route path='account-referrals' element={<AccountReferrals />} />
                    <Route path='account-apikeys' element={<AccountApiKeys />} />
                    <Route path='account-logs' element={<AccountLogs />} />
                    <Route path='auto-write' element={<AutoWrite />} />
                    <Route path='scheduled' element={<Scheduled />} />
                    <Route path='repurpose' element={<Repurpose />} />
                    <Route path='rss' element={<RSS />} />
                    <Route path='chatbot' element={<Chatbot />} />
                    <Route path='fine-tune-models' element={<FineTuneModels />} />
                    <Route path='prompt' element={<Prompt />} />
                    <Route path='setting' element={<Setting />} />
                    <Route path='import' element={<Import />} />
                    <Route path='app-profile' element={<AppProfile />} />
                    <Route path='edit-profile' element={<EditProfile />} />
                    <Route path='post-details' element={<PostDetails />} />
                    <Route path='blog-post' element={<BlogPost />} />
                    <Route path='blog-home' element={<BlogHome />} />
                    <Route path='pricing' element={<Pricing />} />
                    <Route path='category-table' element={<CategoryTable />} />
                    <Route path='add-category' element={<AddCategory />} />
                    <Route path='edit-category' element={<EditCategory />} />
                    <Route path='product-table' element={<ProductTable />} />
                    <Route path='add-product' element={<AddProduct />} />
                    <Route path='edit-product' element={<EditProduct />} />
                    <Route path='ecom-product-grid' element={<ProductGrid />} />
                    <Route path='ecom-product-list' element={<ProductList />} />
                    <Route path='ecom-product-detail' element={<ProductDetail />} />
                    <Route path='ecom-product-order' element={<ProductOrder />} />
                    <Route path='ecom-checkout' element={<Checkout />} />
                    <Route path='ecom-invoice' element={<Invoice />} />
                    <Route path='ecom-customers' element={<Customers />} />
                    <Route path='project-list' element={<ProjectList />} />
                    <Route path='add-project' element={<AddProject />} />
                    <Route path='project-card' element={<ProjectCard />} />
                    <Route path='note' element={<Notes />} />
                    <Route path='file-manager' element={<FileManager />} />
                    <Route path='contact-list' element={<ContactList />} />
                    <Route path='contact-card' element={<ContactCard />} />
                    <Route path='email-compose' element={<EmailCompose />} />
                    <Route path='email-inbox' element={<EmailInbox />} />
                    <Route path='email-read' element={<EmailRead />} />
                    <Route path='calendar' element={<Calendar />} />
                    <Route path='chart-sparkline' element={<SparklineChart />} />
                    <Route path='chart-chartjs' element={<ChartJs />} />
                    <Route path='chart-rechart' element={<RechartJs />} />
                    <Route path='chart-apexchart' element={<ApexChart />} />
                    <Route path='ui-accordion' element={<UiAccordion />} />
                    <Route path='ui-alert' element={<UiAlert />} />
                    <Route path='ui-badge' element={<UiBadge />} />
                    <Route path='ui-button' element={<UiButton />} />
                    <Route path='ui-modal' element={<UiModal />} />
                    <Route path='ui-button-group' element={<UiButtonGroup />} />
                    <Route path='ui-list-group' element={<UiListGroup />} />
                    <Route path='ui-card' element={<UiCards />} />
                    <Route path='ui-carousel' element={<UiCarousel />} />
                    <Route path='ui-dropdown' element={<UiDropDown />} />
                    <Route path='ui-popover' element={<UiPopOver />} />
                    <Route path='ui-progressbar' element={<UiProgressBar />} />
                    <Route path='ui-tab' element={<UiTab />} />
                    <Route path='ui-typography' element={<UiTypography />} />
                    <Route path='ui-pagination' element={<UiPagination />} />
                    <Route path='ui-grid' element={<UiGrid />} />
                    <Route path='uc-select2' element={<Select2 />} /> 
                    <Route path='uc-noui-slider' element={<NouiSlider />} />
                    <Route path='uc-sweetalert' element={<MainSweetAlert />} />
                    <Route path='uc-toastr' element={<MainToastr />} />
                    <Route path='uc-lightgallery' element={<Lightgallery />} />
                    <Route path='widget-basic' element={<Widget />} />
                    <Route path='form-element' element={<Element />} />
                    <Route path='form-wizard' element={<Wizard />} />
                    <Route path='form-ckeditor' element={<CkEditor />} />
                    <Route path='form-pickers' element={<Pickers />} />
                    <Route path='form-validation' element={<FormValidation />} />
                    <Route path='table-bootstrap-basic' element={<BootstrapTable />} />
                    <Route path='table-datatable' element={<DataTable />} />
                    <Route path='empty-page' element={<EmptyPage />} /> */}
                </Route>
            </Routes>
            <ScrollToTop />
        </>
    );
};

function MainLayout() {
    const { menuToggle, sidebariconHover } = useContext(ThemeContext);
    return (
        <>
            <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`} >
                <Nav />
                <div className="content-body" style={{ minHeight: "849px" }}>
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
            {/* <Setting2 /> */}
        </>
    );
}

export default Markup;