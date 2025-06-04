export interface BaseIpcService {
  registerIpcListeners(): void
  registerIpcHandlers(): void
  debug: boolean
}

export type ConstructorWithDebug<T> = new (debug: boolean) => T

export class IpcFactory {
  static create<T extends BaseIpcService>(
    ServiceClass: ConstructorWithDebug<T>,
    debug: boolean = false
  ): T {
    const instance = new ServiceClass(debug)
    instance.registerIpcListeners()
    instance.registerIpcHandlers()
    return instance
  }
}
