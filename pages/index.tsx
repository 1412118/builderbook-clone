import PropTypes from "prop-types";

import Head from "next/head";
import { DocumentContext } from "next/document";
import withAuth from "@/lib/withAuth";

const Index = ({ user }: any) => {
  return (
    <div style={{ padding: "10px 45px" }}>
      <Head>
        <title>Dashboard</title>
        <meta
          name="Description"
          content="This is a description of index page"
        />
      </Head>
      <p>Content of Index page</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

// Index.getInitialProps = (ctx: any) => {
//   return { user: ctx.query.user ? JSON.parse(ctx.query.user) : "" };
// };

export default withAuth(Index);
