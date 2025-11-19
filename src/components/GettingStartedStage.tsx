import {
    useTick
} from '@pixi/react';

import { useState } from 'react';
import { BunnySprite } from '../components/BunnySprite';

interface GettingStartedStageProps {
    canvasWidth: number;
    canvasHeight: number;
    bunnyMoveSpeed: number;
    bunnyRotationSpeed: number;
}

export function GettingStartedStage({
    canvasWidth,
    canvasHeight,
    bunnyMoveSpeed,
    bunnyRotationSpeed }: GettingStartedStageProps) {
    const rotationSpeed = 0.05;
    const radius = 50;

    const [isActive, setIsActive] = useState(false);
    const [xPos, setXPos] = useState(canvasWidth * 0.7);
    const [direction, setDirection] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [angle, setAngle] = useState(0);
    const [bunnyFourXPos, setBunnyFourXPos] = useState(canvasWidth * 0.8 + Math.cos(angle) * radius);
    const [bunnyFourYPos, setBunnyFourYPos] = useState(canvasHeight * 0.8 + Math.sin(angle) * radius);

    useTick((ticker) => {
        const delta = ticker.deltaTime;

        let tempXPos = xPos;
        let tempDirection = direction;
        const tempAngle = angle + rotationSpeed * delta;

        if (tempXPos >= canvasWidth * 0.9) {
            tempDirection = -1;
        }
        else if (tempXPos <= canvasWidth * 0.7) {
            tempDirection = 1;
        }

        tempXPos = tempXPos + tempDirection * delta * bunnyMoveSpeed;

        setRotation(prev => prev + bunnyRotationSpeed);
        setDirection(tempDirection);
        setXPos(tempXPos);
        setAngle(tempAngle);
        setBunnyFourXPos(canvasWidth * 0.8 + Math.cos(tempAngle) * radius);
        setBunnyFourYPos(canvasHeight * 0.8 + Math.sin(tempAngle) * radius);
    });

    return (
        <pixiContainer>
            <BunnySprite
                name='Bunny 1'
                x={canvasWidth * 0.2}
                y={canvasHeight * 0.2}
                onClick={() => setIsActive(prev => !prev)}
                scale={isActive ? 1.75 : undefined} />
            <BunnySprite
                name='Bunny 2'
                x={xPos}
                y={canvasHeight * 0.2} />
            <BunnySprite
                name='Bunny 3'
                x={canvasWidth * 0.2}
                y={canvasHeight * 0.8}
                rotation={rotation} />
            <BunnySprite
                name='Bunny 4'
                x={bunnyFourXPos}
                y={bunnyFourYPos} />
        </pixiContainer>
    );
}