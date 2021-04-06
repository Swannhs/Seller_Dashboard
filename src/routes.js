import Dashboard from "views/dashboard/Dashboard.js";

import UserList from "./views/User/UserList";
import CreateUserAction from "views/User/CreateUserAction.js";
import EditUser from "./views/User/Action/Edit/EditUser";
import ViewUser from "./views/User/Action/ViewUser";

import VoucherList from "views/Voucher/VoucherList.js";
import CreateVoucherApi from "./views/Voucher/CreateVoucher/CreateVoucherApi";

import TransactionTable from "./views/Transaction/AgentTransaction/TransactionTable";
import TransactionAdmin from "./views/Transaction/TransactionAdmin";
import Transfer from "./views/Transaction/Transfer";
import GenerateBalance from "./views/Transaction/GenerateBalance";

import CashTransfer from "./views/Cash/CashTransfer";
import Server from "./views/server/Server";
import Tweak from "./views/tweak/Tweak";
import CreateServer from "./views/server/CreateServer";
import ServerRealm from "./views/server/ServerRealm";
import CreateServerRealms from "./views/server/CreateServerRealms";
import TweakRealm from "./views/tweak/TweakRealm";
import CreateTweak from "./views/tweak/CreateTweak";
import CreateTweakRealm from "./views/tweak/CreateTweakRealm";
import CashSummaryAdmin from "./views/Cash/CashSummaryTable";
import VoucherSummaryTable from "./views/Transaction/VoucherSummaryTable";
import VoucherSummaryAdmin from "./views/Transaction/VoucherSummaryAdmin";


const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon fas fa-tachometer-alt",
        component: Dashboard,
        layout: "/admin",
    },

    //--------------------------User Route Start----------------------------------
    {
        path: '/users/view/:id',
        name: 'View',
        component: ViewUser,
        layout: '/admin'
    },
    {
        path: '/users/view',
        name: 'Users',
        component: UserList,
        layout: '/admin'
    },

    {
        path: '/users/create',
        name: 'Create User',
        component: CreateUserAction,
        layout: '/admin'
    },
    {
        path: "/users/edit/:id",
        name: "Edit",
        component: EditUser,
        layout: "/admin",
    },
    //-------------------------------User Route End----------------------------------


    //-------------------------------Voucher Route Start-----------------------------------
    {
        path: '/voucher/create',
        name: "Reseller",
        component: CreateVoucherApi,
        layout: "/admin",
    },
    {
        path: "/voucher/view",
        name: "Voucher",
        component: VoucherList,
        layout: "/admin",
    },

    {
        path: "/voucher/transaction",
        name: "Transaction",
        component: VoucherSummaryTable,
        layout: '/admin'
    },

    {
        path: "/root/voucher/transaction",
        name: "Transaction",
        component: VoucherSummaryAdmin,
        layout: '/admin'
    },

    {
        path: "/voucher/transfer",
        name: "Transfer",
        component: Transfer,
        layout: '/admin'
    },
    {
        path: "/voucher/generate",
        name: "Transfer",
        component: GenerateBalance,
        layout: '/admin'
    },
    //-------------------------------Voucher Route End-----------------------------------


    //-------------------------------Cash Route Start-----------------------------------
    {
        path: "/cash/transaction",
        name: "Cash Summary",
        component: CashSummaryAdmin,
        layout: '/admin'
    },
    {
        path: "/cash/transfer",
        name: "Transfer",
        component: CashTransfer,
        layout: '/admin'
    },
    //-------------------------------Cash Route End-----------------------------------


    //-------------------------------Server Route Start-------------------------------
    {
        path: "/root/server",
        name: "Server",
        component: Server,
        layout: '/admin'
    },
    {
        path: "/root/server-new",
        name: "Server",
        component: CreateServer,
        layout: '/admin'
    },
    {
        path: "/root/server-realms/new",
        name: "Server",
        component: CreateServerRealms,
        layout: '/admin'
    },
    {
        path: "/root/server-realms",
        name: "Server",
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
        path: "/root/tweak-new",
        name: "Tweak",
        component: CreateTweak,
        layout: '/admin'
    },
    {
        path: "/root/tweak-realms",
        name: "Tweak",
        component: TweakRealm,
        layout: '/admin'
    },
    {
        path: '/root/tweak-realm/new',
        name: "Tweak",
        component: CreateTweakRealm,
        layout: '/admin'
    },
];

export default dashboardRoutes;
