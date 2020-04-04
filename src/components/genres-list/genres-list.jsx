import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {GENRES_TO_RENDER_COUNT} from "../../constants";
import {ActionCreator as ActionCreatorState} from "../../reducer/state/state";
import {ActionCreator as ActionCreatorData} from "../../reducer/data/data";
import {getActiveGenre} from "../../reducer/state/selectors";
import {getGenresList} from "../../reducer/data/selectors";

const GenresList = (props) => {
  const {genresList, onGenreTitleClick, activeGenre} = props;

  return <ul className="catalog__genres-list">
    {genresList.slice(0, GENRES_TO_RENDER_COUNT).map((title, i) => {
      return <li key={i} className={`catalog__genres-item ${title === activeGenre ? `catalog__genres-item--active` : ``}`}>
        <a href="#" className="catalog__genres-link" onClick={(e) => {
          e.preventDefault();
          onGenreTitleClick(title);
        }}>{title}</a>
      </li>;
    })}
  </ul>;
};

GenresList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  genresList: PropTypes.array.isRequired,
  onGenreTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: getActiveGenre(state),
  genresList: getGenresList(state),
});


const mapDispatchToProps = (dispatch) => ({
  onGenreTitleClick(genre) {
    dispatch(ActionCreatorState.setGenre(genre));
    dispatch(ActionCreatorData.setFilmsByGenre(genre));
    dispatch(ActionCreatorState.resetCardsBound());
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
