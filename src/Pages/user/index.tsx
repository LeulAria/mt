import React from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { RootState } from "../../app/store";
import Router from "../../configRoute/routeSubRoute";
import { UserRole } from "../../features/auth/types";
import Chat from "../clients/chat/index";

export default function Index({ routes }: any): JSX.Element {
  const role = useSelector((state: RootState) => state.auth.currentUser.role);
  return (
    <div>
      <Switch>
        {routes.map((value: any, index: any) => (
          <Router key={index} {...value} />
        ))}
      </Switch>
      {role === UserRole.USER ? <Chat/> : null}
    </div>
  );
}
