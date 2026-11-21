const WIKI_KEY = location.hostname
// Each author keeps this wiki's pages in their OWN drive, under this folder.
const PAGES_DIR = `/nomad-wiki/${WIKI_KEY}`
// The list of authors lives in this wiki's drive: { authors: [{ name, url }] }.
const AUTHORS_PATH = '/authors.json'

export function joinPath (...args) {
  var str = args[0]
  for (let v of args.slice(1)) {
    v = v && typeof v === 'string' ? v : ''
    let left = str.endsWith('/')
    let right = v.startsWith('/')
    if (left !== right) str += v
    else if (left) str += v.slice(1)
    else str += '/' + v
  }
  return str
}

const reservedChars = /[ <>:"/\\|?*\x00-\x1F]/g
const endingDashes = /([-]+$)/g
export function slugify (str = '') {
  return str.replace(reservedChars, '-').replace(endingDashes, '')
}

export async function readAuthors () {
  try {
    var data = JSON.parse(await nomad.fs.readFile(AUTHORS_PATH))
    return Array.isArray(data?.authors) ? data.authors : []
  } catch (e) {
    return []
  }
}

// Only the wiki's owner can write this file.
export async function saveAuthors (authors) {
  authors = authors.map(({name, url}) => ({name, url}))
  await nomad.fs.writeFile(AUTHORS_PATH, JSON.stringify({authors}, null, 2))
}

export async function getSiteMeta () {
  var [info, list] = await Promise.all([nomad.fs.getInfo(), readAuthors()])
  var authors = await Promise.all(list.map(async (a) => {
    let authorInfo = await nomad.fs.getInfo(a.url).catch(e => undefined)
    return {name: a.name, url: a.url, writable: !!authorInfo?.writable}
  }))
  return {
    authors,
    userIsAdmin: info.writable,
    userIsAuthor: authors.some(a => a.writable)
  }
}

// The newest version of a page across every author's drive: { url, author, stat }, or undefined.
export async function queryForPage (path) {
  if (path.endsWith('/')) {
    path = joinPath(path, 'index.md')
  }
  var authors = await readAuthors()
  var found = await Promise.all(authors.map(async (author) => {
    let url = joinPath(author.url, PAGES_DIR, path)
    let stat = await nomad.fs.stat(url).catch(e => undefined)
    return stat ? {url, author: author.name, stat} : undefined
  }))
  found = found.filter(Boolean)
  found.sort((a, b) => new Date(b.stat.mtime) - new Date(a.stat.mtime))
  console.debug('Page versions', found)
  return found[0]
}

export async function writeFile (author, path, content) {
  if (path.endsWith('/')) {
    path = joinPath(path, 'index.md')
  }
  var filePath = joinPath(PAGES_DIR, path)
  console.log('writing to', joinPath(author.url, filePath))
  await nomad.fs.drive(author.url).writeFile(filePath, content, {ensureParent: true})
}
