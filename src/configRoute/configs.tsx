import React from 'react';
import Dashboard from '../layouts/applayout/appbar';
import { lazy } from 'react';
import { UserRole } from '../features/auth/types';

export const routes = [
    {
        path: '/',
        exact: true,
        component: lazy(()=> (import('../Pages/home/index'))),
    },
    {
        path: '/login',
        // component: Login
        exact: false,
        component: lazy(()=> import('../Pages/signup/login'))
    },
    {
        path: '/home',
        exact: false,
        component: lazy(()=> import('../Pages/user/index')),
        bars: <Dashboard/>,
        isPrivate: true,
        permission: [UserRole.ADMIN],
        routes:[
            {
                path: '/home/page1',
                exact: false,
                component: lazy(()=> import('../Pages/admin/dashboard'))
            },
            {
                path: '/home/page2',
                exact: false,
                component: lazy(()=> import('../Pages/admin/users_list'))
            },
        ]
    },
    {
        path: '/sales',
        exact: false,
        component: lazy(()=> (import('../Pages/user/sales'))),
        // bar: <Appbar/>,
        isPrivate: true,
        permission: [UserRole.USER]
    },
    {
        path: '/tech',
        exact: false,
        component: lazy(()=> (import('../Pages/user/tech'))),
        // bar: <Appbar/>,
        isPrivate: true,
        permission: [UserRole.TECH_SUPPORT]
    },
    {
        path: '/redirecting'
    }
] 
