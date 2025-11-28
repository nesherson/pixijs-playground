import { useApplication } from "@pixi/react";
import type { Container, ContainerChild } from "pixi.js";
import { useEffect, type RefObject } from "react";

export interface StageWrapperProps {
    children: React.ReactNode;
    worldRef: RefObject<Container<ContainerChild> | null>;
    canvasWidth: number;
    canvasHeight: number;
    onWheel: (e: WheelEvent) => void;
}

export const StageWrapper = ({ children, worldRef, canvasWidth, canvasHeight, onWheel }: StageWrapperProps) => {
    const { app } = useApplication();

    useEffect(() => {
        const canvas = app.canvas as HTMLCanvasElement;

        canvas.addEventListener('wheel', onWheel, { passive: false });

        return () => canvas.removeEventListener('wheel', onWheel);
    }, [app, onWheel]);

    useEffect(() => {
        if (worldRef.current) {
            worldRef.current.x = canvasWidth / 2;
            worldRef.current.y = canvasHeight / 2;
        }
    }, [worldRef, canvasWidth, canvasHeight]);

    return children;
};
