import { UserType } from '../models';

/**
 * Singleton that reads and validates environment variables once.
 * The variables are loaded from .env.<ENV> by playwright.config.ts.
 */
export class EnvConfig {
    private static instance: EnvConfig | undefined;

    public readonly baseUrl: string;
    public readonly apiBaseUrl: string;
    public readonly password: string;
    public readonly apiUser: string;
    public readonly apiPassword: string;
    public readonly usernames: Record<UserType, string>;

    private constructor() {
        this.baseUrl = EnvConfig.read('BASE_URL');
        this.apiBaseUrl = EnvConfig.read('API_BASE_URL');
        this.password = EnvConfig.read('PASSWORD');
        this.apiUser = EnvConfig.read('API_USER');
        this.apiPassword = EnvConfig.read('API_PASSWORD');
        this.usernames = {
            [UserType.Standard]: EnvConfig.read('STANDARD_USER'),
            [UserType.Locked]: EnvConfig.read('LOCKED_USER'),
            [UserType.Problem]: EnvConfig.read('PROBLEM_USER'),
            [UserType.Glitch]: EnvConfig.read('GLITCH_USER'),
        };
    }

    public static getInstance(): EnvConfig {
        EnvConfig.instance ??= new EnvConfig();
        return EnvConfig.instance;
    }

    private static read(name: string): string {
        const value = process.env[name]?.trim();
        if (!value) {
            throw new Error(`Missing environment variable "${name}". Check your .env file.`);
        }
        return value;
    }
}
