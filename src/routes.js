import Dashboard from "views/Dashboard.js";

import UserList from "./views/User/UserList";
import CreateUser from "views/User/CreateUser.js";
import EditUser from "./views/User/Action/Edit/EditUser";

import VoucherList from "views/Voucher/VoucherList.js";
import CreateVoucherApi from "./views/Voucher/CreateVoucher/CreateVoucherApi";

import TransferLayout from "./views/Transaction/TransferLayout";
import Transfer from "./views/Transaction/Transfer";




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
        path: "/transaction",
        name: "Transaction",
        component: TransferLayout,
        layout: '/admin'
    },
    {
        path: "/transfer",
        name: "Transfer",
        component: Transfer,
        layout: '/admin'
    },
];

export default dashboardRoutes;
