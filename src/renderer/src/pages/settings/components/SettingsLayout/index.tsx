import { SettingsSidebar } from '@renderer/pages/settings/components/SettingsSidebar'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 w-full h-full ">
      <SettingsSidebar />
      <main className="flex-1 overflow-auto py-6 px-3 w-full h-full">{children}</main>
    </div>
  )
}
