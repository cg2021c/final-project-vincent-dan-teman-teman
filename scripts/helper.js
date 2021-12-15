// Helper functions and constants

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getDistance(coordinate1, coordinate2) {
  const horizontalDistance = coordinate2.x - coordinate1.x;
  const verticalDistance = coordinate2.y - coordinate1.y;
  return Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2);
}

const vehicleColors = [
  0xa52523,
  0xef2d56,
  0x0ad3ff,
  0xff9f1c 
];

const lawnGreen = "#008000";
const trackColor = "#546E90";
const edgeColor = "#663300";
const treeCrownColor = 0x498c2c;
const treeTrunkColor = 0x4b3f2f;