import React, { useEffect, useState } from "react";
import Axios from "axios";
import ShipMarker from "./ShipMarker";

import {
  getShipApiInfo,
  getShipAdditionalInfo,
  getCoordinates
} from "../utilities/utilities";
import Vessel from "./Vessel";


export default function Ship({ shipId, color }) {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({});

  const call = getShipApiInfo(shipId);
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(call);
      console.log(result.data)
      setData([...result.data]);
    };

    setInfo({ ...getShipAdditionalInfo.find(e => e.MMIS === shipId) });
    fetchData();
  }, [call, shipId]);

  return (
    <div>
      {data.length > 1 &&
        data.map((ship, index) => (
          <div key={index}>
          {index < data.length - 1 && 
            <ShipMarker shipData={ship} color={color} info={info} />
          }
          </div>
        ))}
      {data.length > 1 && (
        <Vessel
          color={color}
          latitude={data[data.length - 1].LAT}
          longitude={data[data.length - 1].LON}
          coordinates={getCoordinates([...data])}
          shipId={shipId}
        />
      )}

    </div>
  );
}
