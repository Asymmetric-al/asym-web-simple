export interface RouteFixture {
  path: string;
  slug: string;
}

export const routeFixtures: RouteFixture[] = [
  {
    path: "/",
    slug: "home",
  },
  {
    path: "/privacy",
    slug: "privacy",
  },
  {
    path: "/terms",
    slug: "terms",
  },
  {
    path: "/early-access/status?state=unavailable",
    slug: "early-access-status",
  },
];
