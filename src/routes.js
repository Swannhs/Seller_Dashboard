import Dashboard from "views/Dashboard/Dashboard.js";

import UserList from "./views/User/UserList";
import CreateUserAction from "views/User/CreateUserAction.js";
import EditUser from "./views/User/Action/Edit/EditUser";
import ViewUser from "./views/User/Action/ViewUser";

import VoucherList from "views/Voucher/VoucherList.js";
import CreateVoucherApi from "./views/Voucher/CreateVoucher/CreateVoucherApi";

import TransactionTable from "./views/Transaction/AgentTransaction/TransactionTable";
import Transfer from "./views/Transaction/Transfer";
import GenerateBalance from "./views/Transaction/GenerateBalance";

import CashTransfer from "./views/Cash/Agent/CashTransfer";
import Server from "./views/Server/Server";
import Tweak from "./views/Tweak/Tweak";
import CreateServer from "./views/Server/CreateServer";
import ServerRealm from "./views/Server/ServerRealm";
import CreateServerRealms from "./views/Server/CreateServerRealms";
import TweakRealm from "./views/Tweak/TweakRealm";
import CreateTweak from "./views/Tweak/CreateTweak";
import CreateTweakRealm from "./views/Tweak/CreateTweakRealm";
import TransactionSummaryTable from "./views/Transaction/AgentTransaction/TransactionSummaryTable";
import VoucherSummaryAdmin from "./views/Transaction/Admin/VoucherSummaryAdmin";
import TransactionAdmin from "./views/Transaction/Admin/TransactionAdmin";
import CashSummaryTableAgent from "./views/Cash/Agent/CashSummaryTableAgent";
import CashSummaryTableAdmin from "./views/Cash/Admin/CashSummaryTableAdmin";
import CashTableAgent from "./views/Cash/Agent/CashTableAgent";
import CashTableAdmin from "./views/Cash/Admin/CashTableAdmin";
import Profile from "./components/Profile/Profile";
import EditTweak from "./views/Tweak/EditTweak";
import EditServer from "./views/Server/EditServer";
import ViewTweak from "./views/Tweak/ViewTweak";
import ChangePassword from "./components/Password/ChangePassword";
import TransactionRefund from "./views/Transaction/TransactionRefund";
import Logout from "./components/Login/Logout";
import Version from "./views/Version/Version";
import CreateVersion from "./views/Version/CreateVersion";
import EditVersion from "./views/Version/EditVersion";


const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon fas fa-tachometer-alt",
        component: Dashboard,
        layout: "/admin",
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        layout: "/admin",
    },
    {
        path: "/change-password",
        name: "Profile",
        component: ChangePassword,
        layout: "/admin",
    },

    //--------------------------User Route Start----------------------------------
    {
        path: '/users/view/:id',
        name: 'Reseller Details',
        component: ViewUser,
        layout: '/admin'
    },
    {
        path: '/users/view',
        name: 'Resellers',
        component: UserList,
        layout: '/admin'
    },

    {
        path: '/users/create',
        name: 'Create Reseller',
        component: CreateUserAction,
        layout: '/admin'
    },
    {
        path: "/users/edit/:id",
        name: "Edit Reseller",
        component: EditUser,
        layout: "/admin",
    },
    //-------------------------------User Route End----------------------------------


    //-------------------------------Voucher Route Start-----------------------------------
    {
        path: '/voucher/create',
        name: "Create Voucher",
        component: CreateVoucherApi,
        layout: "/admin",
    },
    {
        path: "/voucher/view",
        name: "Vouchers",
        component: VoucherList,
        layout: "/admin",
    },

    {
        path: "/voucher/transaction",
        name: "Credit Balance",
        component: TransactionSummaryTable,
        layout: '/admin'
    },

    {
        path: "/root/voucher/transaction",
        name: "Credit Balance",
        component: VoucherSummaryAdmin,
        layout: '/admin'
    },
    {
        path: "/voucher/transactions/:id",
        name: "Balance Details",
        component: TransactionTable,
        layout: "/admin",
    },

    {
        path: "/root/voucher/transactions/:id",
        name: "Balance Details",
        component: TransactionAdmin,
        layout: "/admin",
    },

    {
        path: "/voucher/transfer",
        name: "Transfer Balance",
        component: Transfer,
        layout: '/admin'
    },
    {
        path: "/voucher/refund",
        name: "Refund Balance",
        component: TransactionRefund,
        layout: '/admin'
    },
    {
        path: "/voucher/generate",
        name: "Generate Balance",
        component: GenerateBalance,
        layout: '/admin'
    },
    //-------------------------------Voucher Route End-----------------------------------


    //-------------------------------Cash Route Start-----------------------------------
    {
        path: "/root/cash/transaction",
        name: "Payments",
        component: CashSummaryTableAdmin,
        layout: '/admin'
    },
    {
        path: "/cash/transaction",
        name: "Payments",
        component: CashSummaryTableAgent,
        layout: '/admin'
    },
    {
        path: "/cash/transactions/:id",
        name: "Payments Details",
        component: CashTableAgent,
        layout: "/admin",
    },
    {
        path: "/root/cash/transactions/:id",
        name: "Payments Details",
        component: CashTableAdmin,
        layout: "/admin",
    },
    {
        path: "/cash/transfer",
        name: "Payments",
        component: CashTransfer,
        layout: '/admin'
    },
    //-------------------------------Cash Route End-----------------------------------


    //-------------------------------Server Route Start-------------------------------
    {
        path: "/root/server",
        name: "Servers",
        component: Server,
        layout: '/admin'
    },
    {
        path: "/root/server-edit/:id",
        name: "Edit Server",
        component: EditServer,
        layout: "/admin",
    },
    {
        path: "/root/server-new",
        name: "Add Server",
        component: CreateServer,
        layout: '/admin'
    },
    {
        path: "/root/server-realms/new",
        name: "Map Server and Vendor",
        component: CreateServerRealms,
        layout: '/admin'
    },
    {
        path: "/root/server-realms",
        name: "Server and Vendor Mapping",
        component: ServerRealm,
        layout: '/admin'
    },


    //--------------------------------Tweak------------------------------
    {
        path: "/root/tweak",
        name: "Tweak",
        component: Tweak,
        layout: '/admin'
    },
    {
        path: "/root/tweak-view/:id",
        name: "Tweak Details",
        component: ViewTweak,
        layout: '/admin'
    },
    {
        path: "/root/tweak-edit/:id",
        name: "Edit Tweak",
        component: EditTweak,
        layout: "/admin",
    },
    {
        path: "/root/tweak-new",
        name: "Create Tweak",
        component: CreateTweak,
        layout: '/admin'
    },
    {
        path: "/root/tweak-realms",
        name: "Tweak and Vendor Mapping",
        component: TweakRealm,
        layout: '/admin'
    },
    {
        path: '/root/tweak-realm/new',
        name: "Map Tweak and Vendor",
        component: CreateTweakRealm,
        layout: '/admin'
    },

//------------------------------------Version-----------------------------
    {
        path: '/root/version',
        name: "Versions",
        component: Version,
        layout: '/admin'
    },
    {
        path: '/root/version-create',
        name: "Create Version",
        component: CreateVersion,
        layout: '/admin'
    },
    {
        path: '/root/version-edit/:id',
        name: "Edit Version",
        component: EditVersion,
        layout: '/admin'
    },

//    ----------------------Logout----------------
    {
        path: '/api/logout',
        name: "Logout",
        component: Logout,
        layout: '/admin'
    },

];

export default dashboardRoutes;
