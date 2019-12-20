// https://help.marinetraffic.com/hc/en-us/articles/203990998-What-is-the-significance-of-the-AIS-Navigational-Status-Values-
export const statusMap = {
  0: "under way using engine",
  1: "at anchor",
  2: "not under command",
  3: "restricted maneuverability",
  4: "constrained by her draught",
  5: "moored",
  6: "aground ",
  7: "engaged in fishing",
  8: "under way sailing",
  9: "reserved for future amendment of navigational status for ships carrying DG, HS, or MP, or IMO hazard or pollutant category C, high-speed craft (HSC)",
  10: "reserved for future amendment of navigational status for ships carrying dangerous goods (DG), harmful substances (HS) or marine pollutants (MP), or IMO hazard or pollutant category A, wing in ground (WIG)",
  11: "power-driven vessel towing astern (regional use)",
  12: "power-driven vessel pushing ahead or towing alongside (regional use)",
  13: "reserved for future use",
  14: "AIS-SART (active), MOB-AIS, EPIRB-AIS",
  15: "undefined",
  95: "Base Station",
  96: "Class B",
  97: "SAR Aircraft",
  98: "Aid to Navigation",
  99: "Class B"
};

export const vessels = {
  304880000: { color: "#1D4A9F" },
  305983000: { color: "#953244" },
  357568000: { color: "#00A870" },
  219551000: { color: "#69306D" }
};

export const formatData = arr =>
  arr.reduceRight(
    (acc, { MMSI, COURSE, LON, LAT, SPEED, STATUS }) => [
      ...acc,
      {
        MMSI: Number(MMSI),
        course: Number(COURSE),
        lng: Number(LON),
        lat: Number(LAT),
        speed: Number(SPEED),
        status: Number(STATUS)
      }
    ],
    []
  );

// https://gist.github.com/basarat/4670200
export function getCardinal(angle) {
  /* Given "0-360" returns the nearest cardinal direction "N/NE/E/SE/S/SW/W/NW"
   */
  /**
   * Customize by changing the number of directions you have
   * We have 8
   */
  const degreePerDirection = 360 / 8;

  /**
   * Offset the angle by half of the degrees per direction
   * Example: in 4 direction system North (320-45) becomes (0-90)
   */
  const offsetAngle = angle + degreePerDirection / 2;

  return offsetAngle >= 0 * degreePerDirection &&
    offsetAngle < 1 * degreePerDirection
    ? "N"
    : offsetAngle >= 1 * degreePerDirection &&
      offsetAngle < 2 * degreePerDirection
    ? "NE"
    : offsetAngle >= 2 * degreePerDirection &&
      offsetAngle < 3 * degreePerDirection
    ? "E"
    : offsetAngle >= 3 * degreePerDirection &&
      offsetAngle < 4 * degreePerDirection
    ? "SE"
    : offsetAngle >= 4 * degreePerDirection &&
      offsetAngle < 5 * degreePerDirection
    ? "S"
    : offsetAngle >= 5 * degreePerDirection &&
      offsetAngle < 6 * degreePerDirection
    ? "SW"
    : offsetAngle >= 6 * degreePerDirection &&
      offsetAngle < 7 * degreePerDirection
    ? "W"
    : "NW";
}
