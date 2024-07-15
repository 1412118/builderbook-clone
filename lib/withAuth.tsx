import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

let globalUser: any = null;

export default function withAuth(
  BaseComponent: any,
  { loginRequired = true, logoutRequired = false } = {}
) {
  function App(props: any) {
    const { user, isFromServer } = props;

    useEffect(() => {
      if (isFromServer) {
        globalUser = user;
      }

      //   if (loginRequired && !logoutRequired && !user) {
      //     Router.push("/public/login", "/login");
      //     return;
      //   }

      if (logoutRequired && user) {
        Router.push("/");
      }
    }, [user, isFromServer]);

    if (
      (loginRequired && !logoutRequired && !user) ||
      (logoutRequired && user)
    ) {
      return null;
    }

    return <BaseComponent {...props} />;
  }

  App.getInitialProps = async (ctx: any) => {
    const isFromServer = typeof window === "undefined";
    const user = ctx.req ? ctx.req.user : globalUser;
    const props = { user, isFromServer };

    if (BaseComponent.getInitialProps) {
      Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
    }

    return props;
  };
  return App;
}
