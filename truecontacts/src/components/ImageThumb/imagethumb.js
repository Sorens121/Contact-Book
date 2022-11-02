import React from 'react';
import { Image } from 'semantic-ui-react';
import './style.css';

const ImageThumb = ({ firstname, lastname, src, className, style, floated }) => {
    const getInitials = () => {
        if(firstname && lastname){
            return `${firstname[0]}${lastname[0]}`;
        } else {
            return "";
        }
    }
    return (
        <div>
            {src && (
                <Image 
                    circular
                    width={80}
                    height={80}
                    src={src}
                    style={style}
                    className={className}
                    floated={floated}
                />
            )}

            {!src && (
                <div style={style} className={`thumbnail ${className}`}>
                    <span>{getInitials()}</span>
                </div>
            )}
        </div>
    )
}

export default ImageThumb