import {
  APP_EXTENSION_TYPES,
  API_EXTENSION_TYPES as OFFICIAL_API_EXTENSION_TYPES,
  HYBRID_EXTENSION_TYPES,
  PACKAGE_EXTENSION_TYPES,
} from '@directus/shared/constants'

export enum LogLevel {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

export const API_EXTENSION_TYPES = [...OFFICIAL_API_EXTENSION_TYPES, 'model'] as const

export const HELPER_EXTENSION_TYPES = ['command', 'utility'] as const

export const EXTENSION_TYPES = [
  ...APP_EXTENSION_TYPES,
  ...API_EXTENSION_TYPES,
  ...HYBRID_EXTENSION_TYPES,
  ...HELPER_EXTENSION_TYPES,
] as const

export const EXTENSION_PACKAGE_TYPES = [...EXTENSION_TYPES, ...PACKAGE_EXTENSION_TYPES] as const
