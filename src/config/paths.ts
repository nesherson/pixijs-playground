export const paths = {
  home: {
    name: "Home",
    path: "/",
    getHref: () => "/",
  },
  pointsAndLines: {
    name: "Points and lines",
    path: "/points-and-lines",
    getHref: () => "/points-and-lines",
  },
   coordinatePlane: {
    name: "Coordinate plane",
    path: "/coordiante-plane",
    getHref: () => "/coordiante-plane",
  },
} as const;

export type RouteKeys = keyof typeof paths;
