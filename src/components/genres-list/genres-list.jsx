import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {GENRES_TO_RENDER_COUNT} from "../../constants";
import {ActionCreator} from "../../reducer";

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
  activeGenre: state.activeGenre,
  genresList: state.genresList,
});


const mapDispatchToProps = (dispatch) => ({
  onGenreTitleClick(genre) {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.setFilmsByGenre(genre));
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
