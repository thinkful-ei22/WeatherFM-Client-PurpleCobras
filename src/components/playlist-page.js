import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchPlaylists } from '../actions/playlists';

export class PlaylistPage extends React.Component {
  componentDidMount() {
    console.log('Component Mounted');
    this.props.dispatch(fetchPlaylists());


  }

  render() {
    console.log(this.props.playlists);
    let userPlaylists;
    userPlaylists = this.props.playlists;

    let links = []
    let userPlaylistArray;
    if (this.props.playlists) {
      userPlaylistArray = Object.keys(userPlaylists);
      let i = 0;
      userPlaylistArray.map(() => {
        let name = userPlaylistArray[i];
        links.push(<Link key={name} to={`/playlist/${name}`} className="playlistLink">{name} Playlist <br /></Link>);
        i++;
      });
      return links;
    }

    console.log(userPlaylistArray);

    return (
      <div>
        {links}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      name: `${currentUser.firstName}`,
      playlists: state.playlists.playlists
  };
};

export default requiresLogin()(connect(mapStateToProps)(PlaylistPage));