export function csvJSON (csvText) {
  const csvLines = csvText.split(/\r\n|\n/);
  let headers = csvLines[0].split(';'),
      lines = [];
  headers = headers.map((val) => {
    return val.replace(/['"]+/g, '');
  });
  for (let i = 1; i < csvLines.length; i++) {
    const data = csvLines[i].split(';');
    if (data.length === headers.length) {
      let _d = {};
      for (let j = 0; j < headers.length; j++) {
        _d[headers[j]] = data[j].replace(/['"]+/g, '');
      }
      lines.push(_d);
    }
  }

  return {
    headers,
    lines
  };
}

//TEMPORARY (WHILE API ISN'T DONE)
function getRespType(response, factorsLength) {
  if (factorsLength === 6) {
    return response < 3 ? 'good' : (response > 3 && response < 6 ? 'bad' : 'mid');
  } else if (factorsLength === 5) {
    return response < 3 ? 'good' : (response > 2 && response < 5 ? 'bad' : 'mid');
  } else
    return null;
}

export function getQuestionsData (waveData) {
  const headers = Object.keys(waveData[0]);
  let res = {};
  //Transform wave data into question data
  for (let _d of waveData) {
    for (let _col of headers) {
      const val = parseInt(_d[_col]);
      if (!isNaN(val)) {
        if (!res[_col]) res[_col] = {};
        const oldVal = res[_col][val];
        res[_col][val] = oldVal ? oldVal + 1 : 1;
      }
    }
  }

  //Treat data to get 'indice'
  res.indiceSum = 0;
  res.indiceNb = 0;
  for (let _col of headers) {
    if (_col[0] === 'q' && !isNaN(parseInt(_col[1])) && res[_col]) {
      const _factors = Object.keys(res[_col]);
      res[_col].responses = { good: 0, mid: 0, bad: 0 }
      res[_col].nb = 0;
      for (let _factor of _factors) {
        const _nb = parseInt(res[_col][_factor]),
              _f = parseInt(_factor),
              _type = getRespType(_f, _factors.length);
        res[_col][_type] += _nb;
        res[_col].nb += _nb;
      }
      res[_col].goodResPercent = (res[_col].responses.good * 100 / res[_col].nb);
      res[_col].badResPercent = (res[_col].responses.bad * 100 / res[_col].nb);
      res[_col].indice = res[_col].goodResPercent - res[_col].badResPercent;
      res.indiceSum += res[_col].indice;
      res.indiceNb++;
    }
  }
  res.indiceMean = res.indiceSum / res.indiceNb;
  return res;
}

export function getCSV (path) {
  return fetch(path).then((_d) => {
    return _d.text();
  });
}

export function getMultipleCSV (...path) {
  let promises = [];
  for (let _path of arguments) {
    promises.push(getCSV(_path));
  }
  return Promise.all(promises);
}