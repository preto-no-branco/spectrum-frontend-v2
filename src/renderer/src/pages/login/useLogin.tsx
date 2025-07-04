import { useLoginForm } from './useLoginForm'

// Re-export types for backward compatibility
export type {
  ServerValidationStatus as LoginStatus,
  ServerStatusState as StatusState
} from '@hooks/useServerValidation'

export type { AuthLoginState } from './useLoginForm'

export { statusIcons } from '@hooks/useServerValidation'

export function useLogin() {
  const {
    form,
    fields,
    onSubmit,
    isSubmitDisabled,
    isPasswordHidden,
    togglePasswordVisibility,
    statusState,
    serverState,
    dispatchServerEvent,
    isServerValid,
    authState,
    clearError,
    isFormValid,
    isLoading
  } = useLoginForm()

  return {
    // Form management
    form,
    fields,
    onSubmit,
    submitDisable: isSubmitDisabled, // Keep original prop name for backward compatibility

    // Password visibility
    isPasswordHidden,
    togglePasswordVisibility,

    // Server validation
    statusState,
    serverMachineState: serverState, // Keep original prop name for backward compatibility
    dispatchServerEvent,
    isServerValid,

    // Authentication
    authState,
    clearError,

    // Form state
    isFormValid,
    isLoading
  }
}
