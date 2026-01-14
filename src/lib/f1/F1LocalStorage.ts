import type { ApiCache, Pagination } from 'jolpica-f1-api'

export class F1LocalStorage implements ApiCache {
  public async get<T>(path: string, pagination?: Pagination): Promise<T | null> {
    const cached = localStorage.getItem(this.getCacheKey(path, pagination))

    if (!cached) {
      return null
    }

    const { timestamp, data } = JSON.parse(cached) as { timestamp: number; data: T }

    // TODO: Cache responses that will never change forever... if possible
    // Day
    if (Date.now() - timestamp >= 86400) {
      return null
    }

    return data
  }

  public async set(
    data: unknown,
    cacheControl: unknown | undefined,
    path: string,
    pagination?: Pagination,
  ): Promise<void> {
    console.log(333)
    localStorage.setItem(
      this.getCacheKey(path, pagination),
      JSON.stringify({ timestamp: Date.now(), data }),
    )
  }

  private getCacheKey(path: string, pagination?: Pagination): string {
    return (
      'f1cache.' +
      path
        .split('/')
        .filter((part) => part)
        .concat([String(pagination?.limit ?? 'null'), String(pagination?.offset ?? 'null')])
        .join('-')
    )
  }
}
