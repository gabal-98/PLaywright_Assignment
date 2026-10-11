export interface LoginCase {
    title: string;
    username: string;
    password: string;
    expectedError: string;
}

export const INVALID_LOGIN_CASES: LoginCase[] = [
    {
        title: 'empty username',
        username: '',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Username is required',
    },
    {
        title: 'empty password',
        username: 'standard_user',
        password: '',
        expectedError: 'Epic sadface: Password is required',
    },
    {
        title: 'wrong password',
        username: 'standard_user',
        password: 'wrong_password',
        expectedError: 'Epic sadface: Username and password do not match any user in this service',
    },
];
