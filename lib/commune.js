const {extractDates, parseCodeDepartement} = require('./util')

function parseCommune(record, options = {}) {
  if (!options.parseDate) {
    throw new Error('parseDate is required')
  }

  const dates = extractDates(record, options.parseDate)

  const result = {
    type: 'commune',
    codeDepartement: parseCodeDepartement(record),
    codeCommune: record.substr(0, 2) + record.substr(3, 3),
    cleRivoli: record.charAt(10),
    nomCommune: record.substr(11, 30).trim(),
    ...dates
  }

  result.id = `${result.codeCommune}`

  if (options.computeCompleteIds) {
    result.hid = `commune:${result.codeCommune}@${dates.dateAjout}`
  }

  return result
}

module.exports = {parseCommune}
