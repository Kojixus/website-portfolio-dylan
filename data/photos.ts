export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const photos = {
  dylanHelmet: {
    src: "/photos/dylan-helmet.jpg",
    width: 1331,
    height: 2000,
    alt: "Dylan Dana belted into the car in his white and blue helmet, with his name and the 2021 Summer League Champion decal on the side.",
    caption: "Belted in and waiting for the green.",
  },
  integraFront: {
    src: "/photos/integra-daytona-front.jpg",
    width: 2000,
    height: 1331,
    alt: "Kovi Racing's grey #214 Acura Integra coming through the infield at Daytona.",
    caption: "Kovi Racing #214 in the Daytona infield.",
  },
  integraPan: {
    src: "/photos/integra-daytona-pan.jpg",
    width: 2000,
    height: 1331,
    alt: "The #214 Integra panning past the wall at Daytona, its Kovi Racing decal sharp against a blurred background.",
    caption: "#214 at full tilt, Daytona.",
  },
  daytonaGrandstand: {
    src: "/photos/daytona-grandstand.jpg",
    width: 2000,
    height: 1331,
    alt: "A line of ChampCar entries running past the empty checkered grandstands at Daytona International Speedway.",
    caption: "Daytona's front stretch, World Center of Racing.",
  },
  helmetCockpit: {
    src: "/photos/helmet-cockpit.jpg",
    width: 1333,
    height: 2000,
    alt: "Driver strapped into the car wearing a white helmet with blue and gold flames and a mirrored visor.",
    caption: "Strapped into the #412 Miata.",
  },
  driverChange: {
    src: "/photos/driver-change.jpg",
    width: 1400,
    height: 2000,
    alt: "Driver in a flame-painted helmet climbing into the #412 car during a driver change.",
    caption: "Driver change. Practised until it's boring.",
  },
  sebringPan: {
    src: "/photos/sebring-pan.jpg",
    width: 2000,
    height: 1333,
    alt: "The black and orange #412 Mazda Miata panning across Sebring's concrete.",
    caption: "#412 across the Sebring concrete.",
  },
  frontStraightBlur: {
    src: "/photos/front-straight-blur.jpg",
    width: 2000,
    height: 1333,
    alt: "The #412 Miata at speed, blurred against the grass and track behind it.",
    caption: "Flat out on the straight.",
  },
  sebringDirt: {
    src: "/photos/sebring-dirt.jpg",
    width: 1333,
    height: 2000,
    alt: "The #412 Miata kicking up a cloud of dirt with two wheels off the track.",
    caption: "Using all of the track, and a bit more.",
  },
  sebringChase: {
    src: "/photos/sebring-chase.jpg",
    width: 2000,
    height: 1333,
    alt: "The #412 Miata leading a green car through a corner at Sebring, with Michelin, Lexus Racing and Mobil 1 boards behind.",
    caption: "Holding position at Sebring.",
  },
  lowAngleClouds: {
    src: "/photos/low-angle-clouds.jpg",
    width: 1333,
    height: 2000,
    alt: "The #412 Miata seen from low in the grass under a tall bank of cloud.",
    caption: "Long stint, big sky.",
  },
  portrait: {
    src: "/photos/portrait.jpg",
    width: 1400,
    height: 2000,
    alt: "Portrait of Dylan Dana smiling, in glasses and a blue T-shirt.",
    caption: "Out of the car, between stints.",
  },
  teamBadge: {
    src: "/photos/level-one-badge.jpg",
    width: 1467,
    height: 2000,
    alt: "Level One Racing badge mounted on the rear wing endplate.",
    caption: "Level One Racing, on the wing endplate.",
  },
} satisfies Record<string, Photo>;

/** Order for the gallery: alternate action and detail so it doesn't read as nine car shots. */
export const galleryOrder: Photo[] = [
  photos.daytonaGrandstand,
  photos.dylanHelmet,
  photos.integraPan,
  photos.sebringChase,
  photos.helmetCockpit,
  photos.integraFront,
  photos.sebringDirt,
  photos.teamBadge,
  photos.frontStraightBlur,
  photos.driverChange,
  photos.sebringPan,
  photos.lowAngleClouds,
  photos.portrait,
];
