import { Application, type ApplicationOptions } from "pixi.js";

export interface IPixiApp {
  canvas: HTMLCanvasElement;
  isInitializing: boolean;
  isInitialized: boolean;
  init(): Promise<void> | void;
  destroy(): void;
}

export class PixiApplication extends Application {
  public isInitializing = false;
  public isInitialized = false;

  async initialize(options?: Partial<ApplicationOptions>) {
    this.isInitializing = true;
    try {
      await this.init(options);
      this.isInitialized = true;
    } catch (err) {
      console.error("Pixi initialization failed", err);
    } finally {
      this.isInitializing = false;
    }
  }
}
