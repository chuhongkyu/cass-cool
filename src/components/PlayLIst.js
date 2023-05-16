import React, { useState, useEffect } from 'react';

const PLAY_ID = '37i9dQZF1DX0sa2Fqej3CR'

const PlayList = () => {
 const [accessToken, setAccessToken] = useState('');
 const [musicList, setMusicList] = useState([]);
 const [isPlaying, setIsPlaying] = useState(false);
 const [currentTrack, setCurrentTrack] = useState('');

 useEffect(() => {

 const script = document.createElement("script");
 script.src = "https://sdk.scdn.co/spotify-player.js";
 script.async = true;

 document.body.appendChild(script);



 const clientId = '41f483ba06604bd98d551109cbd31f7c';

 const clientSecret = '3c1b65956af948fc8aa066c8b4a9108f';




 const getToken = async () => {

 const response = await fetch('https://accounts.spotify.com/api/token', {
 method: 'POST',
 headers: {

 'Content-Type': 'application/x-www-form-urlencoded',

 'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)

 },

 body: 'grant_type=client_credentials'

 });




 const data = await response.json();

 const token = data.access_token;

 setAccessToken(token);

 console.log(accessToken)

 };



 getToken();



 window.onSpotifyWebPlaybackSDKReady = () => {

 // window 붙임

 console.log(accessToken)

 const player = new window.Spotify.Player({

 name: 'Web Playback SDK Quick Start Player',

 getOAuthToken: cb => { cb(accessToken); },

 volume: 0.5

 });

 console.log("작용",player)




 player.addListener("ready", ({ device_id }) => {

 console.log("Ready with Device ID", device_id);

 });




 player.addListener("not_ready", ({ device_id }) => {

 console.log("Device ID has gone offline", device_id);

 });

 player.addListener("player_state_changed", (state) => {

 if (!state) {

 return;

 }

 console.log("state changed", state);

 });




 player.connect();

 }

 }, []);




 const getMusicList = async () => {

 const response = await fetch(`https://api.spotify.com/v1/playlists/${PLAY_ID}/tracks`, {

 method: 'GET',

 headers: {

 'Authorization': 'Bearer ' + accessToken

 }

 });




 const data = await response.json();

 const tracks = data.items.map(item => item.track);

 setMusicList(tracks);

 console.log(tracks[0])

 };




 const playTrack = async (trackId, token) => {

 setCurrentTrack(trackId);

 setIsPlaying(true);




 console.log("Play: 파라미터",token)

 console.log("Play: 이건 진짜",accessToken)



 const response = await fetch('https://api.spotify.com/v1/me/player/play', {

 method: 'PUT',

 headers: {

 'Authorization': 'Bearer '+ token,

 'Content-Type': 'application/json'

 },

 body: JSON.stringify({

 uris: [`${trackId}`],

 })

 });




 console.log("응답", response.body)



 if (response.status === 204) {

 console.log('Playback started.');

 } else {
 console.log('Failed to start playback.');

 } };




const stopTrack = async () => {

 setCurrentTrack('');

 setIsPlaying(false);
 
};



return (

 <div>
<button onClick={getMusicList}>Load Music List</button>



 {musicList.map(track => (
<div key={track.id}>

 <span>{track.name}</span>

 <button onClick={() => playTrack(track.uri, accessToken)}>Play</button>
 </div>

 ))}




{isPlaying && (

<div>

 <span>Now Playing: {currentTrack}</span>

 <button onClick={stopTrack}>Stop</button>

</div>
 )}

 </div>
 );

};

export default PlayList;

