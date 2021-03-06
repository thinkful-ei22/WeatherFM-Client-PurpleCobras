/* global $ expect jest */
import playListReducer from '../reducers/playlists';
import {
  fetchPlaylistsSuccess, 
  fetchPlaylistsError, 
  deleteSongSuccess, 
  deleteSongError, 
  addSongSuccess, 
  addSongError,
  changeSongsSuccess,
  changeSongsError,
  changeSongsInvalid,} from '../actions/playlists';

describe ('Playlist Reducers', () => {
  it('Should set the initial state when nothing is passed in.', () => {
    const state = playListReducer(undefined, {type: '@@UNKNOWN'});
    expect(state).toEqual({
      playlists: null,
      error: null,
      deleted: null,
      invalid: null});
  });
  it('Should handle the fetch playlist success action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const playlist = {test: 'test'};
    const state = playListReducer(oldState, fetchPlaylistsSuccess(playlist));
    expect(state.playlists).toEqual(playlist);
  });
  it('Should handle the fetch playlist error action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const error = {error: 400};
    const state = playListReducer(oldState, fetchPlaylistsError(error));
    expect(state.error).toEqual(error);
  });

  it('Should handle the delete song success action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const state = playListReducer(oldState, deleteSongSuccess());
  });
  it('Should handle the delete song error action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const error = {error: 400};
    const state = playListReducer(oldState, deleteSongError(error));
    expect(state.error).toEqual(error);
  });

  it('Should handle the add song success action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const state = playListReducer(oldState, addSongSuccess());
  });
  it('Should handle the add song error action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const error = {error: 400};
    const state = playListReducer(oldState, addSongError(error));
    expect(state.error).toEqual(error);
  });
  it('Should handle the change song success action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const state = playListReducer(oldState, changeSongsSuccess());
    expect(state.error).toEqual(null);
    expect(state.invalid).toEqual(null);
  });
  it('Should handle the change song error action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const error = {error: 400};
    const state = playListReducer(oldState, changeSongsError(error));
    expect(state.error).toEqual(error);
  });
  it('Should handle the change song error action.', () => {
    const oldState = {
      playlists: null,
      error: null,
      deleted: null,
      invalid: null
    };
    const invalid = {message: 'invalid'};
    const state = playListReducer(oldState, changeSongsInvalid(invalid));
    expect(state.invalid).toEqual(invalid);
    expect(state.error).toEqual(null);
  });
});