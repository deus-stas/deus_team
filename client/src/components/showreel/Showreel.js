import {useEffect, useRef, useState} from 'react'
import Popup from 'reactjs-popup';

import './showreel.scss';
import {usePrevious} from "react-admin";
import {current} from "@reduxjs/toolkit";

const apiUrl = ''

const Showreel = (props) => {
    const {data, isMain} = props;
    const [open, setOpen] = useState(false);
    const [isInViewport, setIsInViewport] = useState(false);
    const prevIsInViewport = usePrevious({isInViewport, setIsInViewport});
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
    const [isFirstClickVideo, setisFirstClickVideo] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);

    const videoRef = useRef(null);
    const showReelRef = useRef(null)


    const closeModal = () => setOpen(false);
    const openModal = () => {
        setOpen(true);
        videoRef.current.pause();
    };



    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        if (!!hasPlayedOnce || !!isMain) {
            if (!!videoRef && !!videoRef.current && prevIsInViewport !== isInViewport) {
                if (!isInViewport) {
                    if(!videoRef.current.paused || !hasPlayedOnce){
                        setCurrentTime(videoRef.current.currentTime);
                        videoRef.current.pause()
                        videoRef.current.currentTime = 4;
                    }
                } else {
                    videoRef.current.currentTime = currentTime;
                    videoRef.current.play();
                    setHasPlayedOnce(true)
                }

            }
        }
    }, [isInViewport])

    const handleScroll = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const videoRect = videoElement.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const videoHeight = videoRect.height;
            const scrollOffset = 0.5 * videoHeight;
            const isInViewport = (
                (videoRect.top >= -scrollOffset && videoRect.top <= windowHeight - scrollOffset) ||
                (videoRect.bottom >= scrollOffset && videoRect.bottom <= windowHeight + scrollOffset)
            );
            setIsInViewport(isInViewport);
        }
    };

    const handlePlay = () => {

        if (!!videoRef.current.paused) {
            if (isFirstClickVideo) {
                videoRef.current.currentTime = 0;
                setisFirstClickVideo(false)
            }
            setHasPlayedOnce(true);
            videoRef.current.currentTime = currentTime;
            videoRef.current.play();
        } else {
            setCurrentTime(videoRef.current.currentTime);
            videoRef.current.pause();
            videoRef.current.currentTime = 17;
        }
    };

    return (
        <div className="showreel">
            {
                isMain ? (
                    <div ref={showReelRef} className="showreel__s ${!isPlaying ? 'playIcon' : ''} wow fadeIn"
                         data-wow-duration="0.5s"
                         data-wow-delay="0.1s"
                         onClick={handlePlay}
                    >
                        {
                            data.video && data.video !== 'undefined' && data.video !== 'null' ?
                                <video ref={videoRef} muted loop playsInline preload={'auto'}>
                                    <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}
                                            type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                </video> :
                                data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                                    <div dangerouslySetInnerHTML={{__html: data.videoUrl}}></div> :
                                    <video muted loop playsInline  preload={'auto'}>
                                        <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}
                                                type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                    </video>
                        }
                    </div>
                ) : (
                    <>
                        <div className="showreel__title">
                            {data.name}
                            {data.year && data.year.length > 0 && <span> — {data.year}</span>}
                        </div>
                        <div className="showreel__s playIcon" onClick={openModal}>

                            {
                                data.video && data.video !== 'undefined' && data.video !== 'null' ?
                                    <video ref={videoRef} muted loop playsInline>
                                        <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}
                                                type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                    </video> :
                                    data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                                        <div dangerouslySetInnerHTML={{__html: data.videoUrl}}></div> :
                                        <video muted loop playsInline>
                                            <source
                                                src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}
                                                type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                        </video>
                            }
                        </div>
                    </>
                )
            }

            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div>
                    <div className="popup__close" onClick={closeModal}>
                        &times;
                    </div>
                    {
                        data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                            <div dangerouslySetInnerHTML={{__html: data.videoUrl}}></div> :
                            <video muted controls playsInline loop autoPlay className="popup__video">
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}/>
                            </video>
                    }
                </div>
            </Popup>
        </div>
    )

}

export default Showreel;
