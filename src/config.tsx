import packageJson from '../package.json';

export type ConfigValue = {
  appName: string;
  appVersion: string;
};

export const CONFIG: ConfigValue = {
  appName: 'Visumind',
  appVersion: packageJson.version,
};

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'fallback_secret_key';
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';