import React from 'react';
import Song from './song';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchSpotify } from '../actions/spotify';
import { fetchYoutube } from '../actions/youtube';
import { clearYoutubeSuccess } from '../actions/youtube';
import { addSong } from '../actions/playlists';
import '../css/app.css';
import Slider from './slider';
import { changeWeather } from '../actions/weather';
import '../css/discover.css';

export class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
    }
  }

  thumbnail = "";
  i = 0;
  componentDidMount = () => {
    this.props.dispatch(fetchSpotify(this.props.weather));
    this.setState({ changed: false });
  }
  componentWillUnmount = () => {
    this.props.dispatch(clearYoutubeSuccess())
  }
  getPrevSong() {
    if (this.i > 0) {
      this.i--;
      this.returnSong(this.i);
    }
  }

  getNextSong() {
    this.i++;
    if (this.i === this.props.spotifyList.length){
      console.log(this.i);
      this.i=0;
    }
    this.returnSong(this.i);
  }

  onEnded() {
    this.getNextSong();
  }

  addSongToPlaylist() {
    return (
      <button onClick={(e) => {
        this.props.dispatch(addSong(
          this.props.weather,
          this.props.spotifyList[this.i].spotifyId,
          this.props.spotifyList[this.i].artist,
          this.props.spotifyList[this.i].songTitle,
          this.props.spotifyList[this.i].thumbnail
        ))
      }} className="addToPlaylist">
        Add to Playlist
      </button>
    );
  }

  returnSong(index) {
    this.i = index;
    //set returnHTML to empty string 
    let returnHTML = '';
    //if spotifyList has a length
    if (this.props.spotifyList.length) {
      this.thumbnail = <div className="thumbnailBorder"></div>;
      // <img src={this.props.spotifyList[this.i].thumbnail} alt={this.props.spotifyList[index].songTitle}/>
      this.props.dispatch(fetchYoutube(this.props.spotifyList[index].songTitle, this.props.spotifyList[index].artist))
    }

    if (!this.props.spotifyList.length && this.props.url !== '') {
      return returnHTML = <h3>COULDNT FIND ANYTHING TRY CHANGING SLIDERS</h3>
    }
    if (this.props.url === '') {
      return returnHTML = <div className="lds-circle"></div>
    } else if (this.props.url && this.props.spotifyList.length){
      returnHTML = 
      <div className="songTitle">
           <h3>{this.props.spotifyList[index].songTitle} by {this.props.spotifyList[index].artist}</h3>
        <div className="thumbnail">{this.thumbnail}</div>
        <Song url={this.props.url} 
          onEnded={()=> this.onEnded()}
          onPrevClick={() => this.getPrevSong()}
          onNextClick={() => this.getNextSong()}
         />
   
        <div className="controls"></div>
        <div className="addSong">{this.addSongToPlaylist()}  </div>
      </div>;
      return returnHTML;
    }
  }

  changeWeather(newWeather) {
    this.props.dispatch(changeWeather(newWeather))
      .then(this.props.dispatch(fetchSpotify(this.props.weather)))
      .then(this.returnSong(0))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="discover">
       <h6 className="right-now"> Right now it is {this.props.weather}! <br /> </h6>
       <div className="radio-changer">
        <label htmlFor="Radio">Change the station: </label>
      
        <select
          name="Radio"
          onChange={e =>
            this.changeWeather(e.target.value)
            // console.log(e.target.value)
            
        }
        defaultValue="">
        <option value="" disabled="disabled">Select Weather</option>    
          <option value="Sunny">Sunny</option>
          <option value="Rainy">Rainy</option>
          <option value="Drizzle">Drizzle</option>
          <option value="Snowy">Snowy</option>
          <option value="Cloudy">Cloudy</option>
          <option value="Thunderstorm">Thunderstorm</option>
        </select>
        </div>

        <br /><br />

        <h2 className="radio-name">{this.props.weather} Radio</h2>
        {this.returnSong(this.i)}
       
        <Slider />
      </section>
    )
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName}`,
    weather: state.weather.weather,
    spotifyList: state.spotify.songs,
    title: state.youtube.videoTitle,
    url: state.youtube.videoURL,
    changed: state.weather.changed,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Discover));