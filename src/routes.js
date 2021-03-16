import Dashboard from "views/Dashboard.js";

import UserList from "./views/User/UserList";
import CreateUser from "views/User/CreateUser.js";
import EditUser from "./views/User/Action/Edit/EditUser";

import VoucherList from "views/Voucher/VoucherList.js";
import CreateVoucherApi from "./views/Voucher/CreateVoucher/CreateVoucherApi";

import TransactionTable from "./views/Transaction/AgentTransaction/TransactionTable";
import Transfer from "./views/Transaction/Transfer";

import CashTable from "./views/Cash/CashTable";
import CashTransfer from "./views/Cash/CashTransfer";




const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon fas fa-tachometer-alt",
        component: Dashboard,
        layout: "/admin",
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
        component: CreateUser,
        layout: '/admin'
    },
    {
        path: "/users/edit/:id",
        name: "Edit",
        component: EditUser,
        layout: "/admin",
    },



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
        path: "/voucher/transfer",
        name: "Transfer",
        component: Transfer,
        layout: '/admin'
    },

    {
        path: "/cash/transaction",
        name: "Cash",
        component: CashTable,
        layout: '/admin'
    },
    {
        path: "/cash/transfer",
        name: "Transfer",
        component: CashTransfer,
        layout: '/admin'
    },
];

export default dashboardRoutes;
