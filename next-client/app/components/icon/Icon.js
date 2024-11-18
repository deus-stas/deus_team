// import sprite from '../../../public/img/sprite.svg'


// export const Icon = (props) => (
//     <svg viewBox={props.viewBox ? props.viewBox : '0 0 16 16'}  className={`icon icon-${props.icon}`}>
//         <use xlinkHref={`${sprite}#icon-${props.icon}`}/>
//     </svg>
// );

export const Icon = (props) => (
    <svg
        viewBox={props.viewBox ? props.viewBox : '0 0 16 16'}
        className={`icon icon-${props.icon}`}
    >
        <use xlinkHref={`/img/sprite.svg#icon-${props.icon}`} />
    </svg>
);