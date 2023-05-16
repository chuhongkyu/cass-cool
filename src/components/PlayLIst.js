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

    useEffect(() => {

        //외부 스크립트를 동적으로 로드
        // const script = document.createElement("script");
        // script.src = "https://sdk.scdn.co/spotify-player.js";
        // script.async = true;
        // document.body.appendChild(script);

        // //컴포넌트가 언마운트되었을 때 스크립트를 제거
        // return () => {
        //     document.body.removeChild(script);
        // };

    }, []);

    useEffect(() => {

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
        
        // window.onSpotiyWebPlaybackSDKReady = () => {
        //     // window 붙임
        //     const token = 'BQDLeLQsKpPXTe3srNNlkGFlmdV_lpgaWav4bo2c9saaWqN8X9QTpXMzIJgjjQoz-Du39BhUWdJ4Ru6omS0nhsxed5byvKvrp0_i8ehYbnrFJawG4SZ9KpXNeuLtqLfQyCovdjJy9TCLX4-eb-myKSlpRHE_Q5GinfwO9k6XVKozvIgqVhuP6KmS4Mo6W3pqnijeIO_q6D-ML4LrE2_buv2PbMC8fkmu4w';
        //     console.log("token",token)
        //     const player = new window.Spotify.Player({
        //         name: 'Web Playback SDK Quick Start Player',
        //         getOAuthToken: cb => { cb(token); },
        //         volume: 0.5
        //     });
        
        //     player.addListener("ready", ({ device_id }) => {
        //         console.log("Ready with Device ID",device_id);
        //         setDiviceId(device_id)
        //     });
        
        //     player.addListener("not_ready", ({ device_id }) => {
        //         console.log("Device ID has gone offline", device_id);
        //     });
        
        //     player.addListener("player_state_changed", (state) => {
        //     if (!state) {
        //     return;
        //     }
        //         console.log("state changed", state);
        //         setPosition(state.position);
        //     });
        
        //     player.connect();
        //     player.connect().then(success => {
        //         if (success) {
        //         console.log('The Web Playback SDK successfully connected to Spotify!');
        //         }
        //     })
        //     console.log(player)
        // }
        
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

        // const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
        //     method: 'PUT',
        //     headers: {
        //     'Authorization': `Bearer ${accessToken}`,
        //     'Content-Type': 'application/json'
        // },
        let id = "0d1841b0976bae2a3a310dd74c0f3df354899bc8";

        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
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
        <div className='main'>
            <button className='loginbtn' onClick={getMusicList}>Spotify 로그인</button>
            {musicList.map(track => (
                <div className='list' key={track.id} style={{width: "100%", display:"flex", justifyContent:"space-between",alignItems:"center"}}>
                    <img style={{width:"50px", height:"50px"}}src={track.album.images[0].url} alt={track.album.id}/>
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

