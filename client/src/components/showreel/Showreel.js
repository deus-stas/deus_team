import {useEffect, useRef, useState} from 'react'
import Popup from 'reactjs-popup';

import './showreel.scss';
import {usePrevious} from "react-admin";


class MutedVideo extends HTMLVideoElement {
    constructor() {
      super();
      this.muted = true;
      this.autoPlay = true;
    }
  }

customElements.define("x-muted", MutedVideo, { extends: "video" });

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const Showreel = (props) => {
    const [open, setOpen] = useState(false);
    const [isInViewport, setIsInViewport] = useState(false);
    const prevIsInViewport = usePrevious({isInViewport, setIsInViewport});

    const videoRef = useRef(null);
    const showReelRef = useRef(null)

    const closeModal = () => setOpen(false);
    const openModal = () => {
        setOpen(true);
        videoRef.current.pause();
    };

    const { data, isMain } = props;

    useEffect(() => {
        const videoElement = videoRef.current;
        const showreelElement = showReelRef.current;
        if (videoElement && showreelElement) {
            videoElement.addEventListener("play", () => {
              showreelElement.classList.remove("showreel__s");
            });
        
            videoElement.addEventListener("pause", () => {
              showreelElement.classList.add("showreel__s");
            });
        }
        
          return () => {
            if (videoElement && showreelElement) {
              videoElement.removeEventListener("play", () => {
                showreelElement.classList.remove("showreel__s");
              });
        
              videoElement.removeEventListener("pause", () => {
                showreelElement.classList.add("showreel__s");
              });
            }
          };
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!!videoRef && !!videoRef.current && prevIsInViewport !== isInViewport) {
            if (!isInViewport) {
                videoRef.current.pause()
            } else {
                videoRef.current.play();
            }

        }
    }, [isInViewport])

    const handleScroll = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const videoRect = videoElement.getBoundingClientRect();
            const isInViewport = (
                videoRect.top >= 0 &&
                videoRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            setIsInViewport(isInViewport)
        }
    };

    return (
        <div className="showreel">

            {
                isMain ? (
                    <div ref={showReelRef} className="showreel__s playIcon wow fadeIn"
                         data-wow-duration="2s"
                         data-wow-delay="1.5s">
                        {
                            data.video && data.video !== 'undefined' && data.video !== 'null' ?
                            <video ref={videoRef} autoPlay muted loop  playsInline>
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                            </video> :
                            data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                                <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
                                <video autoPlay muted loop  playsInline>
                                    <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
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
                            <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
                            <video muted controls playsInline loop autoPlay className="popup__video">
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} />
                            </video>
                    }
                </div>
            </Popup>
        </div>
    )

}

export default Showreel;
