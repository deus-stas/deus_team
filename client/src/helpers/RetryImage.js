import React, {useMemo, useState} from 'react';
const RetryImage = (props) => {
    const { src, alt,className } = props;
    const [imageLoadError, setImageLoadError] = useState(false);

    // Мемоизируем свойство src с использованием useMemo
    const memoizedSrc = useMemo(() => props.src, [props.src]);

    const handleImageError = () => {
        setImageLoadError(true);
        setTimeout(()=>retryImageLoad(),30000);
    };

    const retryImageLoad = () => {
        setImageLoadError(false);
    };

    return (
        <div>
            {imageLoadError ? (
                <p>Ошибка загрузки изображения. Повторная попытка...</p>
            ) : (
                <img className={className} src={memoizedSrc} alt={alt} onError={handleImageError} />
            )}
        </div>
    );
};

export default RetryImage;