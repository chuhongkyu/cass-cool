import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PLAY_ID = '37i9dQZF1DX0sa2Fqej3CR'

const Play = () => {
    const [accessToken, setAccessToken] = useState();
    const [musicList, setMusicList] = useState([]);
    const [active, setActive] = useState(false)

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
        };
        getToken()
    }, []);

    const getMusicList = async () => {
        setActive(true)
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

    return (
        <motion.div
            initial={{x:"100%"}}
            animate={{x:0}}
            transition={{duration: 1.5, ease:"easeInOut"}}
            exit={{x:"-100%"}}
            className='play'>
            {!active ? <button className='loginbtn' onClick={getMusicList}>Spotify 로그인</button> : null}
            <div className='lists'>
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
            </div>
        </motion.div>
    );
};

export default Play;