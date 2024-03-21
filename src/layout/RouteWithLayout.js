import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { path, layout: Layout, component: Component, isAuth = true, ...rest } = props;

  if (!isLoggedIn && isAuth) {
    let from = path === '/' ? '' : '?from=' + path;
    return <Redirect from={path} to={'/sign-in' + from}/>;
  }

  return (
    <Route path={path}
           {...rest}
           render={matchProps => (
             <Layout>
               <Component {...matchProps} />
             </Layout>
           )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  isAuth: PropTypes.bool
};

export default RouteWithLayout;
