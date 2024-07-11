import Link from "next/link";

import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";

import { styleToolbar } from "./SharedStyles";
import { Avatar } from "@mui/material";
import MenuWithAvatar from "./MenuWithAvatar";

const optionsMenu = [
  {
    text: "Got question?",
    href: "https://github.com/async-labs/builderbook/issues",
  },
  {
    text: "Log out",
    href: "/logout",
    anchor: true,
  },
];

const Header = ({ user }: any) => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item sm={11} xs={9} style={{ textAlign: "left" }}>
          {user ? null : (
            <Link href="/">
              <Avatar
                src="https://storage.googleapis.com/builderbook/logo.svg"
                alt="Builder Book logo"
                style={{ margin: "0px auto 0px 20px", cursor: "pointer" }}
              />
            </Link>
          )}
        </Grid>
        <Grid item sm={1} xs={3} style={{ textAlign: "right" }}>
          {user ? (
            <div style={{ whiteSpace: " nowrap" }}>
              {user.avatarUrl ? (
                <MenuWithAvatar
                  options={optionsMenu}
                  src={user.avatarUrl}
                  alt={user.displayName}
                />
              ) : null}
            </div>
          ) : (
            <Link href="/login" style={{ margin: "0px 20px 0px auto" }}>
              Log in
            </Link>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  </div>
);

export default Header;
