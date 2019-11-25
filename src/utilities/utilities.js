export const getShipInfo = ShipMmis =>
  `https://services.marinetraffic.com/api/vesselmasterdata/v:3/8205c862d0572op1655989d939f1496c092ksvs4/mmsi:${ShipMmis}/protocol:jsono`;

export const getShipAdditionalInfo = [
  {
    MMIS: 310624000,
    name: "QUEEN VICTORIA",
    imgUrl: "https://photos.marinetraffic.com/ais/showphoto.aspx?photoid=261933&size=thumb"
  },
  {
    MMIS: 235106595,
    name: "BRITANNIA",
    imgUrl: "https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=1873308&size=thumb"
  },
  {
    MMIS: 308516000,
    name: "DISNEY MAGIC",
    imgUrl: "https://photos.marinetraffic.com/ais/showphoto.aspx?photoid=3246379&size=thumb"
  }
];

export const getCoordinates= (arrObj)=>{
  const arr=[]
  arrObj.forEach((element,i) => {
    const innerArr=[]
    innerArr.push(element.LON) 
    innerArr.push(element.LAT)
   
    arr.push(innerArr);
  });
  return arr;
}

export const getMapKey = 'pk.eyJ1IjoibWFlbmRyb3MiLCJhIjoiY2szOTdvcmt2MGc0eDNjb3lzeWJuMGIweSJ9.l-LVqcu9UDFJ_uFIN0eKuQ'
;
export const getShipApiInfo = ShipMmis =>
  `https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:daily/days:20/mmsi:${ShipMmis}/protocol:jsono`;
