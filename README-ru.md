# Парсер подписчиков Instagram

Используйте данный скрипт для сбора списка подписчиков или подписок аккаунта Instagram.

## Возможности

- Сбор имени пользователя и ссылки подписчиков Instagram
- Скачивание форматированных данных о подписках в файл
- Простая и удобная работа с консолью
- Горячие клавиши <kbd>Crtl</kbd> + <kbd>Shift</kbd> + <kbd>Up</kbd> для остановки парсинга

## Использование

1. Go to https://instagram.com/username/followers/ or ../following/
2. Press <kbd>F12</kbd> to open browser development panel
3. Open the `Console` tab
4. Copy code from [parser.js](parser.js)
5. Insert code to command line in `Console`
6. Enter the required settings or leave the default
7. Press <kbd>Enter</kbd>
8. Press <kbd>Enter</kbd> again or click `OK` in alert from Instagram tab
9. Wait while parser is working...
10. You can use shortcut key <kbd>Crtl</kbd> + <kbd>Shift</kbd> + <kbd>Up</kbd> to stop parsing
11. Done! You got followers data

1. Перейдите на https://instagram.com/username/followers/ или ../following/
2. Нажмите <kbd>F12</kbd> чтобы открыть панель разработчика
3. Откройте вкладку `Консоль`
4. Скопируйте код из файла [parser.js](parser.js)
5. Вставьте код в командную строку во вкладке `Консоль`
6. Введите необходимые настройки или оставьте по умолчанию
7. Нажмите <kbd>Enter</kbd>
8. Нажмите <kbd>Enter</kbd> ещё раз или кликните по кнопке `OK` во всплывающем окне
9. Ожидайте, пока парсер работает...
10. Вы можете использовать горячие клавиши <kbd>Crtl</kbd> + <kbd>Shift</kbd> + <kbd>Up</kbd> чтобы остановить парсинг
11. Готово! Вы получили данные о подписчиках

## Настройки

| Настройка | Описание | Тип |
| --- | --- | --- |
| scrollDelay | Время перед следующим скроллом | `integer` |
| theSameHeightNum | После скольких совпадений высоты элемента списка парсер останавливается | `integer` |
| followersLimit | После какого количества собранных подписчиков скрипт останавливается | `integer` |
| followersListBoxTag | Тег элемента с подписчиками | `string` |
| followersListScrollBoxTag | Тег элемента скролла с подписчиками | `string` |
| followerElementTag | Тег элемента подписчика | `string` |
| followerNameTag | Тег элемента с ником подписчика | `string` |
| followerLinkTag | Тег элемента с ссылкой подписчика | `string` |
| checkLoadingTag | Тег элемента загрузки | `string` |
| removeSymbols | Символы, которые будут удалены из выходных данных | `array (string)` |
| download | Необходимо ли скачивать файл с данными | `boolean` |
| fileName | Имя файла | `string` |
| fileExtension | Расширение файла | `string` |
| outputFormat | Формат данных в файле | `string` |

## Формат выходных данных

| Тег | Описание |
| --- | --- |
| `{$username}` | Ник подписчика |
| `{$link}` | Слаг ссылки подписчика |
| `\n` | Новая строка |

## Примеры вывода данных

### Excel файл

Создаёт excel файл с двумя колонками

```javascript
const settings = {
  fileExtension: '.csv',
  outputFormat:  `{$username};https://instagram.com{$link}\n`,
};
```
