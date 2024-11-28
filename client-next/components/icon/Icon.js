export const Icon = (props) => (
    <svg
        viewBox={props.viewBox ? props.viewBox : '0 0 16 16'}
        className={`icon icon-${props.icon}`}
    >
        <use xlinkHref={`/img/sprite.svg#icon-${props.icon}`} />
    </svg>
);