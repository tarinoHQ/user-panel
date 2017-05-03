export function generateDriveUrl({ scope, state, redirectUrl, clientId }) {
  const mScope = encodeURIComponent(scope.join(' '));
  const mState = encodeURIComponent(state);
  const mRedirectUrl = encodeURIComponent(redirectUrl);
  const mClientId = encodeURIComponent(clientId);

  return `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=${mScope}&state=${mState}&redirect_uri=${mRedirectUrl}&response_type=code&client_id=${mClientId}`;
}
