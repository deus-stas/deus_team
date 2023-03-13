import sprite from '../../img/sprite.svg'

export const Icon = (props) => (
    <svg viewBox='0 0 16 16' className={`icon icon-${props.icon}`}>
        <use xlinkHref={`${sprite}#icon-${props.icon}`} />
    </svg>
);