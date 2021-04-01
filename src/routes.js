import Dashboard from "views/Dashboard.js";

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

import CashTableAdmin from "./views/Cash/CashTableAdmin";
import CashTransfer from "./views/Cash/CashTransfer";
import CashTableAgent from "./views/Cash/CashTableAgent";


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
        component: TransactionTable,
        layout: '/admin'
    },

    {
        path: "/root/voucher/transaction",
        name: "Transaction",
        component: TransactionAdmin,
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
        path: "/root/cash/transaction",
        name: "Cash",
        component: CashTableAdmin,
        layout: '/admin'
    },
    {
        path: "/cash/transaction",
        name: "Cash",
        component: CashTableAgent,
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
        name: "Transfer",
        component: CashTransfer,
        layout: '/admin'
    },
    {
        path: "/root/tweak",
        name: "Transfer",
        component: CashTransfer,
        layout: '/admin'
    },
];

export default dashboardRoutes;
