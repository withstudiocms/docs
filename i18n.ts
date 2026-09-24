import type { Locale } from "@lunariajs/core";

type CommonLocale = {
    label: string;
    lang: string;
    parameters: {
        tag: string;
    };
};

type StarlightLocale = {
    label: string;
    lang: string;
};

type StarlightLocaleMap = Record<string, StarlightLocale>;

export const locales: CommonLocale[] = [
    {
        label: 'English',
        lang: 'en',
        parameters: {
            tag: 'en',
        },
    },
    {
        label: 'Español',
        lang: 'es',
        parameters: {
            tag: 'es',
        },
    },
    {
        label: 'Français',
        lang: 'fr',
        parameters: {
            tag: 'fr',
        },
    },
    {
        label: 'Deutsch',
        lang: 'de',
        parameters: {
            tag: 'de',
        },
    },
    {
        label: '简体中文',
        lang: 'zh-cn',
        parameters: {
            tag: 'zh-CN',
        },
    },
    {
        label: '한국어',
        lang: 'ko',
        parameters: {
            tag: 'ko',
        },
    },
]

function toStarlightLocale(commonLocale: CommonLocale): StarlightLocale {
    return {
        label: commonLocale.label,
        lang: commonLocale.parameters.tag,
    };
}

function toStarlightLocaleMap(commonLocales: CommonLocale[]): StarlightLocaleMap {
    const starlightLocaleMap: StarlightLocaleMap = {};
    for (const commonLocale of commonLocales) {
        starlightLocaleMap[commonLocale.lang] = toStarlightLocale(commonLocale);
    }
    return starlightLocaleMap;
}

function toLunariaLocale(commonLocale: CommonLocale): Locale {
    return {
        label: commonLocale.label,
        lang: commonLocale.lang,
        parameters: commonLocale.parameters,
    };
}

function toLunariaLocales(commonLocales: CommonLocale[]): [Locale, ...Locale[]] {
    const lunariaLocales: Locale[] = commonLocales.map(toLunariaLocale)
        // Filter out the source locale (English) for Lunaria, since it is already defined in the config
        .filter((locale) => locale.lang !== 'en');
    if (lunariaLocales.length === 0) {
        throw new Error("No locales provided");
    }
    return [lunariaLocales[0], ...lunariaLocales.slice(1)];
}

export const lunariaLocales: [Locale, ...Locale[]] = toLunariaLocales(locales);

export const starlightLocales: StarlightLocaleMap = toStarlightLocaleMap(locales);
