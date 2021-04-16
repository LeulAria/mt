import React from 'react';
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../app/store";
import { UserRole } from "../features/auth/types";
import {routes} from "./configs";
import Loader from "../components/loader/index"
export default function RouteSubRoute(route: any) {
    const auth = useSelector((state: RootState) => state.auth)
    return (
        <Suspense fallback={<Loader/>}>
            <Route
				path={route.path}
				render={(props) => {
					if (route.path === '/redirecting') {
						switch (auth.currentUser.role) {
							case UserRole.ADMIN:
								return <Redirect from="/redirecting" to="/home/dashboard" />
							case UserRole.SALES_PERSON:
								return <Redirect from="/redirecting" to="/sales" />
							case UserRole.TECH_SUPPORT:
								return <Redirect from="/redirecting" to="/tech" />
							default:
								<Redirect from="/redirecting" to="/login" />;
						}
					} else {
						if (route.isPrivate) {
							if (auth.authenticated) {
								if (route.permission) {
									if (route.permission.includes(auth.currentUser.role)) {
										return <route.component {...props} routes={route.routes}/>
									} else {
										let currentPage: any = {};
										routes.map((item: any, index: any) => {
											if (item.permission)
												if (item.permission.includes(auth.currentUser.role))
													currentPage = { ...item }
										})
										if (Object.keys(currentPage).length !== 0 && currentPage)
											return <Redirect to={`${currentPage.path}`} />
									}
								} else {
									return <route.component {...props} routes={route.routes}/>
								}
							} else {
								return <Redirect to="/login" />
							}
						}else{
							return <route.component {...props} />
						}
					}
				}
				}
			/>
        </Suspense>
    )
}
