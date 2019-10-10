import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchWaypoints() {
  const json = yield fetch('https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:daily/days:60/mmsi:241486000?protocol=json&msgtype=extended')
        .then(response => response.json(), );    
  yield put({ type: "WAYPOINTS_RECEIVED", payload: { waypointsList: json }, });
}
function* actionWatcher() {
     yield takeLatest('GET_VESSEL_WAYPOINTS', fetchWaypoints)
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}