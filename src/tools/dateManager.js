function getAllData(timeZoneString) {
    let data, hour, timeZone;
    data = timeZoneString.split("T")[0].split("-").join("/");
    hour = timeZoneString.split("T")[1].split(".")[0];
    timeZone = timeZoneString.split("T")[1].split(".")[1];

    return [ data, hour.substring(0, hour.length - 3), timeZone ];
}

function getDate(timeZoneString) {
    try {
        return getAllData(timeZoneString)[0];
    } catch {
        return "";
    }
}

function getHour(timeZoneString) {
    try {
        return getAllData(timeZoneString)[1];
    } catch {
        return "";
    }
}

function getTimeZone(timeZoneString) {
    try {
        return getAllData(timeZoneString)[2];
    } catch {
        return "";
    }
}

/**
 * Compara duas datas e retorna qual data é a maior
 * @param {String} date1 (YYYY-mm-dd) Primeira data a ser comparada
 * @param {String} date2 (YYYY-mm-dd) Segunda data a ser comparada  ([null] para comparar com a data atual)
 * @returns {Number} [0] -> date1 = date2 / [1] -> date1 > date2 / [-1] -> date2 > date1
 */
function compareDates(date1, date2 = null) {
    const d1 = date1.split("/").map(element => { return Number(element); });
    let aux;

    if (date2 === null) {
        const today = new Date();
        aux = today.getFullYear()+ '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        aux = aux.split("-").map(element => { return Number(element); });
    }

    else {
        aux = date2.split("-").map(element => { return Number(element); });
    }

    const d2 = aux;
    
    for (let i = 0; i < 3; i++) {
        if (d1[i] > d2[i]) return 1;
        if (d1[i] < d2[i]) return -1;
    }

    return 0;
}

/**
 * Compara duas horas e retona qual delas é a maior
 * @param {String} hour1 (HH:mm) Primeira hora a ser comparada
 * @param {String} hour2 (HH:mm) Segunda hora a ser comparada ([null] para comparar com a hora atual)
 * @returns {Number} [0] -> hour1 = hour2 / [1] -> hour1 > hour2 / [-1] -> hour2 > hour1
 */
function compareHours(hour1, hour2 = null) {
    const h1 = hour1.split(":").map(element => { return Number(element); });
    let aux;

    if (hour2 === null) {
        const today = new Date();
        aux = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0');
    }

    else {
        aux = hour2.split(":").map(element => { return Number(element); });
    }

    const h2 = aux;

    for (let i = 1; i >= 0; i--) {
        if (h1[i] > h2[i]) return 1;
        if (h2[i] > h1[i]) return -1;
    }

    return 0;
}

module.exports = { getDate, getHour, getTimeZone, compareDates, compareHours };