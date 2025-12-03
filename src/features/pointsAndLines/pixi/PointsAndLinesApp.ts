import { Application, FederatedPointerEvent, Point, Rectangle } from "pixi.js";

import { PointNode } from "./PointNode";
import { ButtonNode } from "./ButtonNode";
import { StraightLineNode } from "./StraightLineNode";

export class PointsAndLinesApp {
  public app: Application;

  private selectedPoints: Set<PointNode> = new Set();

  constructor() {
    this.app = new Application();
  }

  async init() {
    await this.app.init({
      background: "#ecf0f1",
      width: 1200,
      height: 820,
      antialias: true,
    });

    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = new Rectangle(
      0,
      0,
      this.app.screen.width,
      this.app.screen.height
    );
    this.app.stage.on("click", this.onStageClick);

    this.addButtons();
  }

  private addButtons = () => {
    const drawStraightLinesBtn = new ButtonNode(
      20,
      10,
      120,
      40,
      5,
      "Draw straight"
    );

    const selectAllPointsBtn = new ButtonNode(
      160,
      10,
      120,
      40,
      5,
      "Select all"
    );

    drawStraightLinesBtn.on("click", this.onDrawStraightLinesBtnClick);
    selectAllPointsBtn.on("click", this.selectAllPoints);

    this.app.stage.addChild(drawStraightLinesBtn, selectAllPointsBtn);
  };

  private onStageClick = (e: FederatedPointerEvent) => {
    if (e.target !== this.app.stage) return;

    const { x, y } = e.getLocalPosition(e.currentTarget);
    const point = new PointNode(x, y);

    point.on("click", this.onPointClick);

    this.app.stage.addChild(point);
  };

  private onPointClick = (e: FederatedPointerEvent) => {
    e.stopPropagation();

    const point = e.currentTarget as PointNode;

    point.toggleSelection();

    if (point.isSelected) {
      this.selectedPoints.add(point);
    } else {
      this.selectedPoints.delete(point);
    }
  };

  private deselectSelectedPoints = () => {
    this.selectedPoints.forEach((sp) => {
      sp.toggleSelection();
    });

    this.selectedPoints.clear();
  };

  private selectAllPoints = () => {
    const pointsToSelect = this.app.stage.getChildrenByLabel(
      "point-node"
    ) as PointNode[];
    console.log(
      "🚀 ~ PointsAndLinesApp ~ selectAllPoints ~ pointsToSelect:",
      pointsToSelect
    );

    if (pointsToSelect.length === 0) return;

    pointsToSelect.forEach((p) => {
      p.toggleSelection();
      this.selectedPoints.add(p);
    });
  };

  private onDrawStraightLinesBtnClick = () => {
    const selectedPoints = Array.from(this.selectedPoints);
    if (selectedPoints.length < 1) return;

    for (let i = 0; i < selectedPoints.length; i++) {
      if (!selectedPoints[i + 1]) break;

      const newLine = new StraightLineNode(
        new Point(selectedPoints[i].x, selectedPoints[i].y),
        new Point(selectedPoints[i + 1].x, selectedPoints[i + 1].y)
      );

      this.app.stage.addChild(newLine);
    }

    this.deselectSelectedPoints();
  };
}
