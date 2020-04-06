import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {AuthorizationStatus} from "../../reducer/user/user";
import {AppRoutes} from "../../constants";

const Header = ({userAuthStatus, userAvatarUrl}) => {

  return <header className="page-header movie-card__head">
    <div className="logo">
      <a className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
    <div className="user-block">
      { (userAuthStatus === AuthorizationStatus.AUTH)
        ? (
          <Link to={AppRoutes.MY_LIST}>
            <div className="user-block__avatar">
              <img src={userAvatarUrl} alt="User avatar" width="63" height="63"/>
            </div>
          </Link>
        )
        : <Link to={AppRoutes.LOGIN} className="user-block__link">Sign in</Link>
      }
    </div>
  </header>;
};

Header.propTypes = {
  userAuthStatus: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
};

export default Header;
