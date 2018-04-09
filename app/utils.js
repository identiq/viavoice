export function csvJSON (csvText) {
  let csvLines = csvText.split(/\r\n|\n/),
      headers = csvLines[0].split(';'),
      lines = [];

  for (let i = 1; i < csvLines.length; i++) {
    let data = csvLines[i].split(';');
    if (data.length === headers.length) {

      let _d = {};
      for (let j = 0; j < headers.length; j++) {
        // _d.push(headers[j] + ":" + data[j]);
        _d[headers[j]] = data[j];
      }
      lines.push(_d);
    }
  }

  return {
    headers,
    lines
  };
}

export function getCSV (path) {
  return fetch(path).then((_d) => {
    return _d.text();
  });
}