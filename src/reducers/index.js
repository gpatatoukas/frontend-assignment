const initState = {
  loading: false,
  waypointsList: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
     case 'GET_VESSEL_WAYPOINTS':
        return { ...state, loading: true };
    
      case 'WAYPOINTS_RECEIVED':
        return {...state, loading: false, waypointsList: action.payload.waypointsList}
     default:
        return state;
   }
};
export default reducer;