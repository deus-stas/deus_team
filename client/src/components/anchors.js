import {setIsLoadingMainPageEvent} from "../axios";

export const gotoAnchor = (e,blockPosition = 'start', isLoad = true) => {
    if (isLoad){
        setIsLoadingMainPageEvent(true)
    }
    setTimeout(() => {
        let element = document.getElementById(e.target.getAttribute('datahash'));
        element.scrollIntoView({behavior: "smooth", block: blockPosition});
    }, 750)
}
