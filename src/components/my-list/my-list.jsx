import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MoviesList from "../movies-list/movies-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../constants";
import {connect} from "react-redux";
import {getUserListFilms} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";

const MoviesListWrapped = withActiveItem(MoviesList);

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUserFilmsList();
  }

  render() {
    const {userFilmsList, avatarUrl} = this.props;

    return <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoutes.ROOT} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={avatarUrl} alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {
          (userFilmsList)
            ? <MoviesListWrapped films={userFilmsList}/>
            : <p>Loading...</p>
        }
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoutes.ROOT} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>;
  }
}

MyList.propTypes = {
  userFilmsList: PropTypes.array.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  loadUserFilmsList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userFilmsList: getUserListFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadUserFilmsList() {
    dispatch(DataOperation.loadUserFilmsList());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
