# Локализация (i18n)

Проект локализован с помощью [next-intl](https://next-intl.dev) **без маршрутизации по URL** —
активный язык хранится в cookie `NEXT_LOCALE`, публичные URL не меняются.

**Языки:** `tg` (таджикский, кириллица — **по умолчанию**), `ru` (русский), `en` (английский).

## Структура

```
i18n/
  config.ts        # список локалей, дефолт, имя cookie, метаданные локалей
  locale.ts        # Server Actions: getUserLocale() / setUserLocale()  ("use server")
  request.ts       # getRequestConfig — резолвит локаль из cookie и грузит каталог
messages/
  tg.json          # каталог сообщений (таджикский, по умолчанию)
  ru.json          # каталог сообщений (русский) — та же структура ключей
  en.json          # каталог сообщений (английский) — та же структура ключей
components/ui/LanguageSwitcher.tsx   # переключатель языка (шапка + футер)
```

Плагин подключён в `next.config.ts` через `createNextIntlPlugin("./i18n/request.ts")`.
Корневой `app/layout.tsx` оборачивает приложение в `<NextIntlClientProvider>` и
выставляет `<html lang>` по активной локали.

> Все каталоги (`tg`/`ru`/`en`) **обязаны** иметь идентичное дерево ключей. На момент миграции — 625 ключей.

## Как использовать переводы

**Клиентский компонент** (`"use client"`):
```tsx
import { useTranslations } from "next-intl";
const t = useTranslations("about");
return <h1>{t("title")}</h1>;
```

**Серверный компонент** (async):
```tsx
import { getTranslations } from "next-intl/server";
const t = await getTranslations("about");
```

**Переменные / множественное число (ICU):**
```tsx
t("found", { count: n })
// ru: "{count, plural, one{# нужда} few{# нужды} other{# нужд}}"
// tg: "{count} ниёз"
```

**Встроенная разметка (ссылки, <br>, <span>) — `t.rich`:**
```tsx
t.rich("agree", { link: (c) => <Link href="/terms">{c}</Link> })
// "Согласен с <link>офертой</link>"
```

**Метаданные страницы** (`app/<route>/layout.tsx`):
```tsx
export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({ namespace: "metadata.about", canonical: "/about" });
}
```
`createPageMetadata` (см. `lib/metadata.ts`) сам подтягивает `title`/`description`
из пространства `metadata.<route>` по текущей локали.

**Ошибки API.** Бэкенд и `lib/api.ts` бросают стабильные коды `ERR_*`. Для показа:
```tsx
import { useErrorTranslator } from "@/lib/errorMessages";
const translateError = useErrorTranslator();
toast.error(translateError(err.message));   // код → строка из namespace "errors"
```
Новые коды ошибок добавляйте в `errors` в обоих каталогах.

## Как добавить новую строку

1. Добавьте ключ во **все три** файла: `messages/tg.json`, `messages/ru.json`, `messages/en.json`
   (одинаковый путь ключа).
2. Используйте `t("ключ")` в компоненте.

## Как добавить новый язык

1. Добавьте код в `locales` и `localeMeta` в `i18n/config.ts`.
2. Создайте `messages/<код>.json` с тем же деревом ключей.
3. Переключатель и `<html lang>` подхватят язык автоматически.

## Проверка целостности каталогов

Перед коммитом полезно убедиться, что у всех каталогов совпадает дерево ключей:
```bash
node -e 'const f=require("fs");const o=(p)=>JSON.parse(f.readFileSync(p,"utf8"));
const L=(o,p="",s=new Set())=>{for(const k in o){const x=p?p+"."+k:k;
o[k]&&typeof o[k]=="object"&&!Array.isArray(o[k])?L(o[k],x,s):s.add(x)}return s};
const base=L(o("messages/tg.json"));let bad=0;
for(const loc of ["ru","en"]){const s=L(o("messages/"+loc+".json"));
const d=[...base].filter(k=>!s.has(k)).concat([...s].filter(k=>!base.has(k)));
if(d.length){bad++;console.log("MISMATCH "+loc+":",d)}}
console.log(bad?"":"OK: "+base.size+" keys × 3 locales")'
```

## ⚠️ Юридические страницы

Таджикский перевод страниц **«Политика конфиденциальности»** (`privacy`) и
**«Публичная оферта»** (`terms`) выполнен машинно и **требует проверки юристом /
носителем языка** перед публикацией. Русские версии — оригинал.
