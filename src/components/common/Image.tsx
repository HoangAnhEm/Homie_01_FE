import React, { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

const Image: React.FC<ImageProps> = ({
    src,
    alt,
    className = "",
    ...rest
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className={`relative ${className}`}>
            {loading && (
                <div
                    className={`absolute inset-0 w-full h-full bg-gray-200 animate-pulse`}
                    data-testid="skeleton"
                />
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
                {...rest}
            />
        </div>
    );
};
