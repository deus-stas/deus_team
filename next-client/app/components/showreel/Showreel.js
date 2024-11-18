import { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import './showreel.scss';
import { usePrevious } from "react-admin";
import showPng from "./showreel.png";
import playCursor from "../../../public/img/videoPlayCursor.svg";
import pauseCursor from "../../../public/img/videoPauseCursor.svg";

const apiUrl = '';

const CustomCursor = ({ isPaused, isVisible, initialPosition }) => {
    const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const cursorWidth = 50; // Half of the custom cursor's width
        const cursorHeight = 200; // Half of the custom cursor's height
        setPosition({ x: e.clientX - cursorWidth, y: e.clientY - cursorHeight });
    };

    useEffect(() => {
        if (isVisible) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className="custom-cursor"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundImage: `url(${isPaused ? playCursor : pauseCursor})`,
            }}
        />
    );
};


const Showreel = (props) => {
    const { data, isMain } = props;
    const [open, setOpen] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [isCursorVisible, setIsCursorVisible] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isDesktopCursor, setIsDesktopCursor] = useState(false);

    const videoRef = useRef(null);
    const showReelRef = useRef(null);

    const closeModal = () => setOpen(false);
    const openModal = () => {
        setOpen(true);
        videoRef.current.pause();
    };

    const handlePlay = () => {
        const isTrue = videoRef.current.paused;
        if (isTrue) {
            videoRef.current.play();
            setIsPaused(false);
        } else {
            videoRef.current.pause();
            setIsPaused(true);
        }
    };

    const handleMouseEnter = (e) => {
        setIsCursorVisible(true);
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        setIsCursorVisible(false);
    };

    useEffect(() => {
        const mobileVersion = () => {
            if (window.innerWidth > 768 ) {
                setIsDesktopCursor(true);
                console.log('Получилось')
            }
            else {
                setIsDesktopCursor(false);
                console.log('брал')
            }
        }
        mobileVersion();
    }, []);

    return (
        <div className="showreel">
            {
                isMain ? (
                    <div
                        ref={showReelRef}
                        className={`showreel__s ${isPaused ? 'pausing' : 'playing'}`}
                        onClick={handlePlay}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: isCursorVisible ? 'none' : 'auto' }} // Hide real cursor when custom cursor is visible
                    >
                        {
                            data.video && data.video !== 'undefined' && data.video !== 'null' &&
                            <video ref={videoRef} poster={showPng} id={"mainVideo"} loop playsInline preload={'auto'}>
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}
                                        type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                            </video>
                        }
                        <img src={playCursor} alt="showreel" />
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
                                        <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
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
                            <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
                            <video muted controls playsInline loop autoPlay className="popup__video">
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}/>
                            </video>
                    }
                </div>
            </Popup>

            {/* Include the custom cursor, visible only when in showreel */}
            <CustomCursor isPaused={isPaused} isVisible={isCursorVisible && isDesktopCursor} initialPosition={cursorPosition} />
        </div>
    );
};


export default Showreel;
