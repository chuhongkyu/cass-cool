'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming'

import React, { useState, useEffect } from 'react';

const PLAY_ID = '37i9dQZF1DX0sa2Fqej3CR'

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const PlayList = () => {
    const [accessToken, setAccessToken] = useState('');
    const [musicList, setMusicList] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [active, setActive] = useState(false)
    const [currentTrack, setCurrentTrack] = useState('');
    const [deviceId, setDiviceId] = useState('');
    const [current_position,setPosition ] = useState('');

    // window 붙임
    // const token = 'BQAxVeCeSq3siH7q-ssqBFoDJoil46_7L2IZnf5srtWAn4Cs1ly8xN2FpIdsjLFkrcg6izjXoWn8EtF20LHUKomn8Hqoho_X-2NtkvVsnfXZDYpTG92PHQVfoQGT3-NlOEdt6H252P8-ocwvihy0ZmN4jLV3LOzWVb0wiYZMtCeOGK2Tn9MQKDOFYvtRw_rWYOuEXOneJzHzfTbad1esi2TCYewUBiYmPw';

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
            const token2 = data.access_token;
            setAccessToken(token2);
            console.log(accessToken)
        };

        getToken();
        
        // 외부 스크립트를 동적으로 로드
        // const script = document.createElement("script");
        // script.src = "https://sdk.scdn.co/spotify-player.js";
        // script.async = true;
        // document.body.appendChild(script);

        // window.onSpotifyWebPlaybackSDKReady = () => {
            
        //     console.log("token",token)

        //     const player = new window.Spotify.Player({
        //         name: 'Web Playback SDK Quick Start Player',
        //         getOAuthToken: cb => { cb(token); },
        //         volume: 0.5
        //     });
        
        //     player.addListener("ready", ({ device_id }) => {
        //         console.log("Ready with Device ID",device_id);
        //         setDiviceId(device_id)
        //         playTrack('38VzP4yWfHdHafITKKRHEB', token, device_id)
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
        //           console.log('The Web Playback SDK successfully connected to Spotify!');
        //         }
        //     })
        //     console.log(player)
        // }
        
    }, []);



    const getMusicList = async () => {
        setActive(!active)
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


    // const playTrack = async (trackId, token, deviceId) => {
    //     setCurrentTrack(trackId);
    //     setIsPlaying(true);

    //     console.log("Play: 파라미터",token)
    //     console.log("Play: 이건 진짜",accessToken)
    //     console.log(trackId)

    //     const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    //         method: 'PUT',
    //         headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //     },

    //     body: JSON.stringify({
    //         "context_uri": `spotify:album:${trackId}`,
    //         "offset": {
    //             "position": 5
    //         },
    //         "position_ms": 0
    //     })

    //     });

    //     if (response.status === 204) {
    //     console.log('Playback started.');
    //     } else {
    //     console.log('Failed to start playback.');
    //     } 
    // };




    const stopTrack = async () => {
        setCurrentTrack('');
        setIsPlaying(false);
    };


    return (
        <div className='main'>
            
            <button className='loginbtn' onClick={getMusicList}>Spotify 로그인</button>
            {active ? null : (
                <div className='description'>
                    <p>spotify 사용법</p>
                    <span>위 버튼 누르세요.</span>
                    <span> - 플레이리스트 링크 복사에서 끌어옴.<br></br>
                            - 개인 플레이리스트 만들면 곡 선정 가능</span>
                    <img src={env.PUBLIC_URL + '/img/dummy.JPG'}/>
                </div>
            ) }
            
            {musicList.map(track => (

                <div className='list' key={track.id} style={{width: "100%", display:"flex", justifyContent:"space-between",alignItems:"center"}}>
                    <a href={track.external_urls.spotify}>
                        <div className='left'>
                            <img style={{width:"50px", height:"50px"}}src={track.album.images[0].url} alt={track.album.id}/>
                            <div className='content'>
                                <span>이름: {track.name}</span>
                                <span>가수: {track.artists[0].name}</span>
                                <span>공개: {track.album.release_date}</span>
                            </div>
                        </div>
                        <span>앨범명:{track.album.name}</span>
                    </a>
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