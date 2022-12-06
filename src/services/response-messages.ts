export const responseMessages = {
    authentication: {
        registerSuccess: 'Successfully registered.',
		loginSuccess: 'Successfully logged in.',
		logoutSuccess: 'Successfully logged out.',
		wrongPassword: 'Wrong password.',
		emailAlreadyExist: 'Email already exists.',
		emailNotConfirmed: 'Email is not confirmed. Please check your mailbox.'
    },

    requestParams: {
        inexistent: 'Field not specified in the body.',
		empty: 'Field has empty value.',
        invalidEmail: 'Email address has an invalid format.',
        invalidDate: 'Date has an invalid format.',
		passwordMinimumLengthRequired: 'Password must be more than 8 characters',
		passwordCriteriaUnmet: 'Password does not meet the following criteria: at least 1 uppercase letter, at least 1 lowercase and at least 1 digit.',
		passwordMatching: 'Password and Confirm password are not the same'
    }
};