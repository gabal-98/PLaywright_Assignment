import { faker } from '@faker-js/faker';
import { CheckoutInfo } from '../../../../../Downloads/playwright-framework/playwright-framework/src/models';

export class CheckoutInfoFactory {
    /** Creates random valid checkout data. Any field can be overridden. */
    public static create(overrides: Partial<CheckoutInfo> = {}): CheckoutInfo {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode('#####'),
            ...overrides,
        };
    }
}
