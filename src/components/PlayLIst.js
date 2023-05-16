'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming'

import React, { useState, useEffect } from 'react';

const PLAY_ID = '37i9dQZF1DX0sa2Fqej3CR'

const PlayList = () => {
 const [accessToken, setAccessToken] = useState('');
 const [musicList, setMusicList] = useState([]);
 const [isPlaying, setIsPlaying] = useState(false);
 const [player, setMainPlayer] = useState()
 const [currentTrack, setCurrentTrack] = useState('');
 const [deviceId, setDiviceId] = useState('');
 const [current_position,setPosition ] = useState('');
 const [sdkToken, setSdkToken] = useState('BQCEPNxPKC9w61xOUrPtSmTDOhNRxVY2A0ZsJkeJXsFJ-jcvoqiXhAjzdFvU-fBzDczeCRf26CL0mbS2QGoHhBoIkTyxQTMSRaLzqKkkB_roNDiWGNMEKNT_KHX8YpWd4BBqFpS3_J6I8uVEF_pJVols94mPcOjFjITZYRI7cb8ffPIrsMsJXrDfTGcZo6NSAJZvZPSqAGVXDiPEYYU72nIIhEVkgnV75A');

const makeScript = () =>{
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
}

 useEffect(() => {

    makeScript()

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
        window.onSpotiyWebPlaybackSDKReady = () => {
           
            // window 붙임
            const token = 'BQCEPNxPKC9w61xOUrPtSmTDOhNRxVY2A0ZsJkeJXsFJ-jcvoqiXhAjzdFvU-fBzDczeCRf26CL0mbS2QGoHhBoIkTyxQTMSRaLzqKkkB_roNDiWGNMEKNT_KHX8YpWd4BBqFpS3_J6I8uVEF_pJVols94mPcOjFjITZYRI7cb8ffPIrsMsJXrDfTGcZo6NSAJZvZPSqAGVXDiPEYYU72nIIhEVkgnV75A';
            console.log(accessToken)
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
    
            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID",device_id);
               
            });
    
            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });
    
            player.addListener("player_state_changed", (state) => {
            if (!state) {
            return;
            }
                console.log("state changed", state);
                setPosition(state.position);
            });
    
            player.connect();
            player.connect().then(success => {
                if (success) {
                console.log('The Web Playback SDK successfully connected to Spotify!');
                }
            })

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
    console.log("뮤직 리스트 1번",tracks[0])

 };


 const playTrack = async (trackId, token) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);

    console.log("Play: 파라미터",token)
    console.log("Play: 이건 진짜",accessToken)
    console.log(trackId)

    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
        "context_uri": `spotify:album:${trackId}`,
        "offset": {
            "position": 5
        },
        "position_ms": 0
    })

    // body: JSON.stringify({
    // uris: [`spotify:track:${trackId}`],
    // })
    

 });

 console.log("응답", response.body)

 if (response.status === 204) {
 console.log('Playback started.');
 } else {
 console.log('Failed to start playback.');
 } 
};




const stopTrack = async () => {
 setCurrentTrack('');
 setIsPlaying(false);
 
};



return (
    <div>
        <button onClick={getMusicList}>Load Music List</button>
        {musicList.map(track => (
            <div key={track.id} style={{width: "100%", display:"flex", justifyContent:"space-between",alignItems:"center"}}>
                <img style={{width:"200px", height:"200px"}}src={track.album.images[0].url} alt={track.album.id}/>
                <span>{track.name}</span>
                <button onClick={() => playTrack(track.album.id, accessToken)}>Play</button>
            {/* <button onClick={() => onPlay(track)}>Play</button> */}
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

