/**
 * Maps Firebase Auth error codes to user-friendly messages.
 * See: https://firebase.google.com/docs/reference/js/auth
 */
export function getAuthErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: string }).code;
    const messageMap: Record<string, string> = {
      'auth/email-already-in-use': 'This email is already registered. Try signing in instead.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/operation-not-allowed': 'This sign-in method is not enabled. Check your Firebase Console.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/user-not-found': 'No account found with this email. You may need to sign up first.',
      'auth/invalid-credential': 'Invalid email or password. Please try again.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/network-request-failed': 'Network error. Please check your connection and try again.',
      'auth/popup-closed-by-user': 'Sign-in was cancelled.',
      'auth/popup-blocked': 'Popup was blocked. Please allow popups for this site.',
      'auth/cancelled-popup-request': 'Only one sign-in request is allowed at a time.',
    };
    if (code && messageMap[code]) {
      return messageMap[code];
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An error occurred. Please try again.';
}
