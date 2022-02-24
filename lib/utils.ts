export function truncateWords(str: string, maxNumberOfWords: number) {
  const words = str.split(/\s/)
  if (words.length <= maxNumberOfWords) {
    return str
  }
  return str.split(/\s/).slice(0, maxNumberOfWords).join(' ') + '...'
}

export function listToString(list: string | string[], andStr = 'and') {
  if (typeof list === 'string') {
    return list
  }
  if (list.length === 0) {
    throw new Error('listToString: list is empty')
  } else if (list.length === 1) {
    return list[0]
  } else if (list.length === 2) {
    return `${list[0]} and ${list[1]}`
  } else {
    return `${list.slice(0, -1).join(', ')}, ${andStr} ${list.slice(-1)}`
  }
}
