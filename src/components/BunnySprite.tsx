import {
    Assets,
    Texture,
} from 'pixi.js';
import {
    useEffect,
    useState,
} from 'react';

interface BunnySpriteProps {
    onClick?: () => void;
    scale?: number;
    x: number;
    y: number;
    rotation?: number;
}

export function BunnySprite({ onClick, scale = 1, x, y, rotation = 0 }: BunnySpriteProps) {
    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load('https://pixijs.com/assets/bunny.png')
                .then((result) => {
                    setTexture(result)
                });
        }
    }, [texture]);

    return (
        <pixiSprite
            anchor={0.5}
            eventMode={'static'}
            onClick={onClick}
            scale={scale}
            texture={texture}
            x={x}
            y={y}
            rotation={rotation} />
    );
}
