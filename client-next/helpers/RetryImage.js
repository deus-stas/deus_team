import React, {useMemo, useState} from 'react';
import Image from 'next/image';

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
        <>
            {imageLoadError ? (
                <p>Ошибка загрузки изображения. Повторная попытка...</p>
            ) : (
                <img className={className} src={memoizedSrc} alt={alt} onError={handleImageError} />
            )}
        </>
    );
};

export default RetryImage;