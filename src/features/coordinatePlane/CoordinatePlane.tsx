import { PixiCanvas } from "../pixiCanvas";
import { CoordinatePlaneApp } from "./pixi/CoordinatePlaneApp";

export function CoordinatePlane() {
  return <PixiCanvas applicationClass={CoordinatePlaneApp} />;
}
