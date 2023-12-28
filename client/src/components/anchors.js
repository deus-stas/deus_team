export const gotoAnchor = (e) => {
    setTimeout(() => {
        let element = document.getElementById(e.target.getAttribute('datahash'));
        element.scrollIntoView({behavior: "smooth", block: "start"});
    }, 750)
}
