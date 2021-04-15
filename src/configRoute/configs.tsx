import React from 'react';
import Dashboard from '../layouts/applayout/appbar';
import { lazy } from 'react';
import { UserRole } from '../features/auth/types';

export const routes = [
    {
        path: '/login',
        // component: Login
        component: lazy(()=> import('../Pages/signup/login'))
    },
    {
        path: '/home',
        component: lazy(()=> import('../Pages/user/index')),
        bars: <Dashboard/>,
        isPrivate: true,
        permission: [UserRole.ADMIN],
        routes:[
            {
                path: '/home/page1',
                component: lazy(()=> import('../Pages/admin/dashboard'))
            },
            {
                path: '/home/page2',
                component: lazy(()=> import('../Pages/admin/users_list'))
            },
        ]
    },
    {
        path: '/sales',
        component: lazy(()=> (import('../Pages/user/sales'))),
        // bar: <Appbar/>,
        isPrivate: true,
        permission: [UserRole.USER]
    },
    {
        path: '/tech',
        component: lazy(()=> (import('../Pages/user/tech'))),
        // bar: <Appbar/>,
        isPrivate: true,
        permission: [UserRole.TECH_SUPPORT]
    },
    {
        path: '/landing',
        component: lazy(()=> (import('../Pages/home/index'))),
    },
    {
        path: '/redirecting'
    }
] 
