export interface BaseIpcService {
  registerIpcListeners(): void
  registerIpcHandlers(): void
  debug: boolean
}

export type ConstructorWithDebug<T, Args extends [boolean, ...any[]]> = new (...args: Args) => T

export class IpcFactory {
  static create<T extends BaseIpcService, Args extends [boolean, ...any[]]>(
    ServiceClass: ConstructorWithDebug<T, Args>,
    ...args: Args
  ): T {
    const instance = new ServiceClass(...args)
    instance.registerIpcListeners()
    instance.registerIpcHandlers()
    return instance
  }
}
