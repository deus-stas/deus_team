import './showreel.scss';
import productVideo from '../../img/webhands.mp4';

const Showreel = () => {

    return (
        <div className="showreel">
            <div className="showreel__title">Showreel <span> — 2021</span></div>
            <div className="showreel__s js-cursor-play">
                <video autoPlay loop muted playsInline>
                    <source src={productVideo} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                </video>
            </div>
        </div>
    )

}

export default Showreel;