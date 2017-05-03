// Login
export const getLoginEmail            = state => state.auth.login.email;
export const getLoginPassword         = state => state.auth.login.password;
export const isLoginFetching          = state => state.auth.login.isFetching;
export const getLoginStatus           = state => state.auth.login.status;
export const getLoginError            = state => state.auth.login.error;

// Signup
export const getSignupFirstName       = state => state.auth.signup.firstName;
export const getSignupLastName        = state => state.auth.signup.lastName;
export const getSignupEmail           = state => state.auth.signup.email;
export const getSignupPassword        = state => state.auth.signup.password;
export const getSignupMobile          = state => state.auth.signup.mobile;
export const isSignupSuccessful       = state => state.auth.signup.isSuccessful;
export const isSignupFetching         = state => state.auth.signup.isFetching;
export const getSignupStatus          = state => state.auth.signup.status;
export const getSignupError           = state => state.auth.signup.error;

// Forgot Password
export const getForgotPasswordEmail   = state => state.auth.forgotPassword.email;
export const isForgotPasswordFetching = state => state.auth.forgotPassword.isFetching;
export const getForgotPasswordStatus  = state => state.auth.forgotPassword.status;
export const getForgotPasswordError   = state => state.auth.forgotPassword.error;

// Forgot Code
export const getForgotCode            = state => state.auth.forgotCode.code;
export const getForgotCodePassword    = state => state.auth.forgotCode.password;
export const isForgotCodeFetching     = state => state.auth.forgotCode.isFetching;
export const getForgotCodeStatus      = state => state.auth.forgotCode.status;
export const getForgotCodeError       = state => state.auth.forgotCode.error;

// Change Forgotten Password
export const getChangeFPwPassword     = state => state.auth.changeFPw.password;
export const isChangeFPwFetching      = state => state.auth.changeFPw.isFetching;
export const getChangeFPwStatus       = state => state.auth.changeFPw.status;
export const getChangeFPwError        = state => state.auth.changeFPw.error;