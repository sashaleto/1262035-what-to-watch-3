import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GenresList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTitle: 0,
    };
  }

  _setLinkActiveClass(id) {
    return this.state.activeTitle === id ? `catalog__genres-item--active` : ``;
  }

  _onLinkClickHandler(e, newActiveTitle) {
    e.preventDefault();
    this.setState({activeTitle: newActiveTitle});
  }

  render() {
    const {genres} = this.props;
    const titles = [`All genres`].concat(Array.from(genres));

    return <ul className="catalog__genres-list">
      {titles.map((title, i) => {
        return <li key={i} className={`catalog__genres-item ${this._setLinkActiveClass(i)}`}>
          <a href="#" className="catalog__genres-link" onClick={(e) => {
            this._onLinkClickHandler(e, i);
          }}>{title}</a>
        </li>;
      })}
    </ul>;
  }
}

GenresList.propTypes = {
  genres: PropTypes.instanceOf(Set).isRequired,
};

export default GenresList;
