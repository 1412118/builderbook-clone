import PropTypes from "prop-types";

import Head from "next/head";
import { DocumentContext } from "next/document";

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

const Index = ({ user }: any) => {
  console.log("Index", user);
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

Index.getInitialProps = (ctx: any) => {
  return { user: ctx.query.user ? JSON.parse(ctx.query.user) : "" };
};

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default Index;
