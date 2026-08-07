export interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
  direction: "ltr" | "rtl";
}

export interface TranslationKey {
  namespace: string;
  key: string;
  description?: string;
  interpolation?: Record<string, string>;
}

export interface TranslationNamespace {
  name: string;
  description?: string;
  keys: TranslationKey[];
}

export type TranslationLoader = (locale: string) => Promise<Record<string, any>>;
