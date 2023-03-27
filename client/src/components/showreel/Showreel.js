import { useState } from 'react'
import Popup from 'reactjs-popup';

import './showreel.scss';

import productVideo from '../../img/webhands.mp4';

const Showreel = () => {
    const [open, setOpen] = useState(false);

    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

    return (
        <div className="showreel">
            <div className="showreel__title">Showreel <span> — 2021</span></div>
            <div className="showreel__s js-cursor-play" onClick={openModal}>
                <video autoPlay loop muted playsInline>
                    <source src={productVideo} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                </video>
            </div>
            <Popup className="popup-video" open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="popup__content">
                    <div className="popup__close" onClick={closeModal}>
                        &times;
                    </div>
                    <video src={productVideo} playsInline loop autoPlay className="popup__video"></video>
                </div>
            </Popup>
        </div>
    )

}

export default Showreel;