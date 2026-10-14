import { CheckoutInfo } from '../models';

export interface InvalidCheckoutCase {
    title: string;
    info: CheckoutInfo;
    expectedError: string;
}

export const INVALID_CHECKOUT_CASES: InvalidCheckoutCase[] = [
    {
        title: 'missing first name',
        info: { firstName: '', lastName: 'Doe', postalCode: '12345' },
        expectedError: 'Error: First Name is required',
    },
    {
        title: 'missing last name',
        info: { firstName: 'John', lastName: '', postalCode: '12345' },
        expectedError: 'Error: Last Name is required',
    },
    {
        title: 'missing postal code',
        info: { firstName: 'John', lastName: 'Doe', postalCode: '' },
        expectedError: 'Error: Postal Code is required',
    },
];
