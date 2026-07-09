// Minimal IndexedDB key/value store. Used to persist the generated logo images
// across the generate -> checkout -> dashboard navigation: at 2K resolution
// four PNGs are ~6MB, which overflows localStorage's ~5MB cap, so they live
// here instead. Small metadata (brand, purchased indices) stays in localStorage.

const DB_NAME = 'logoai'
const STORE = 'kv'

// Opens (and lazily creates) the `logoai` database, ensuring the `kv` store exists.
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

// Stores a value under `key` in the kv store, overwriting any existing entry.
export async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDb()
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).put(value, key)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } finally {
    db.close()
  }
}

// Reads the value stored under `key`, or undefined if no entry exists.
export async function idbGet<T = unknown>(key: string): Promise<T | undefined> {
  const db = await openDb()
  try {
    return await new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(key)
      req.onsuccess = () => resolve(req.result as T)
      req.onerror = () => reject(req.error)
    })
  } finally {
    db.close()
  }
}
