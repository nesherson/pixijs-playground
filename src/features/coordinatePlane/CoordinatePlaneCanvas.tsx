import { Application, useExtend } from "@pixi/react";
import { Container, Graphics, Rectangle as PixiRectangle, Sprite } from "pixi.js";

export function CoordinatePlaneCanvas() {
    useExtend({ Container, Graphics, Sprite, Text });

    const canvasWidth = 920;
    const canvasHeight = 920;

    return (
        <div>
            <Application
                width={canvasWidth}
                height={canvasHeight}
                background='#ecf0f1'
                antialias>
                <pixiContainer
                    eventMode='static'
                    hitArea={new PixiRectangle(0, 0, canvasWidth, canvasHeight)}
                >
                </pixiContainer>
            </Application>
        </div>
    );
}