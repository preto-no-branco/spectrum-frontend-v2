import SettingsLayout from '@renderer/pages/settings/components/SettingsLayout'
import { Outlet } from 'react-router-dom'

export default function Settings() {
  return (
    <SettingsLayout>
      <Outlet />
    </SettingsLayout>
  )
}
