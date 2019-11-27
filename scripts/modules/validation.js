MarineTraffic.Validation = (function() {
  'use strict';

  const elementIds = [
    'mmsi-input-error',
    'period-input-error',
    'days-input-error'
  ];

  function validateCriteria([mmsi, period, days]) {
    const validations = [
      mmsi.length === 9 && /^\d+$/.test(mmsi),
      ['hourly', 'daily'].includes(period),
      +days !== NaN && +days > 0
    ];

    if (validations.every(validation => validation === true)) return true;
    else
      elementIds
        .filter((element, index) => validations[index] !== true)
        .forEach(
          element =>
            (document.getElementById(element).style.visibility = 'visible')
        );
  }

  function resetValidationErrors() {
    elementIds.forEach(
      elId => (document.getElementById(elId).style.visibility = 'hidden')
    );
  }

  return {
    validateCriteria,
    resetValidationErrors
  };
})();
