const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5분

/**
 * 캐시에서 데이터를 가져온다. 만료됐으면 null 반환.
 */
export function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

/**
 * 캐시에 데이터를 저장한다.
 */
export function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * 캐시를 전부 비운다.
 */
export function clearCache() {
  cache.clear();
}
