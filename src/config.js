export const AISStatus = [
  'under way using engine',
  'at anchor',
  'not under command',
  'restricted maneuverability',
  'constrained by her draught',
  'moored',
  'aground', 
  'engaged in fishing',
  'under way sailing',
  'reserved for future amendment of navigational status for ships carrying DG, HS, or MP, or IMO hazard or pollutant category C, high-speed craft (HSC)',
  'reserved for future amendment of navigational status for ships carrying dangerous goods (DG), harmful substances (HS) or marine pollutants (MP), or IMO hazard or pollutant category A, wing in ground (WIG)',
  'power-driven vessel towing astern (regional use)',
  'power-driven vessel pushing ahead or towing alongside (regional use)',
  'reserved for future use',
  'AIS-SART (active), MOB-AIS, EPIRB-AIS',
  'undefined = default (also used by AIS-SART, MOB-AIS and EPIRB-AIS under test)'
]

export const timeDifference = (current, previous) => {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + ' seconds ago';   
  }

  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes ago';   
  }

  else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours ago';   
  }

  else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
  }

  else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
  }

  else {
      return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
  }
}