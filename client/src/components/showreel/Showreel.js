import { useState } from 'react'
import Popup from 'reactjs-popup';

import './showreel.scss';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:5000';

const Showreel = (props) => {
    const [open, setOpen] = useState(false);

    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

    const { data } = props;

    return (
        <div className="showreel">
            <div className="showreel__title">{data.name} <span> — {data.year}</span></div>
            <div className="showreel__s js-cursor-play" onClick={openModal}>
                {
                    data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                        <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
                        <video autoPlay loop muted playsInline>
                            <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                        </video>
                }
            </div>
            <Popup className="popup-video" open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="popup__content">
                    <div className="popup__close" onClick={closeModal}>
                        &times;
                    </div>
                    {
                        data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                            <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
                            <video src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} playsInline loop autoPlay className="popup__video"></video>
                    }
                </div>
            </Popup>
        </div>
    )

}

export default Showreel;