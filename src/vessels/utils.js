export const getVessels = () => [
    { name: 'SELENKA', MMIS: '249598000' },
    { name: 'ORCUN', MMIS: '373732000' },
    { name: 'FRANKOPAN', MMIS: '238020000' },
    { name: 'MSC ELENI', MMIS: '357067000' }
];

export const getURL = mmis =>
    `https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:2/period:daily/days:10/mmsi:${mmis}/protocol:jsono`;
