# WebCloud (UI): Cloud Storage for Photos

## About This Application

**WebCloud (UI)** is a web application designed for storing photos from your VK profile to Yandex.Disk cloud storage. It helps create backups of your photos and allows you to manage them in the cloud.

---

## Key Features

### 📸 Fetch Photos from VK
- The application allows you to select photos directly from your VK profile for copying.
  
### 👁 Preview
- Before uploading, you can preview the selected photos to ensure correctness.

### ☁️ Upload to Cloud
- Selected photos will be uploaded to your Yandex.Disk cloud storage.

### 📂 Manage Copies
- After uploading, you can view, delete, or download the photos back to your computer from the cloud.

---

## Requirements

To use this application, you will need the following:

1. **VK Token**: This token is used to access photos from your VK profile. Insert it into `ACCESS_TOKEN` (path: `js/api/VK.js`).
2. **VK User ID**: Your unique VK user ID to retrieve photos.
3. **Yandex.Disk Token**: This key is required to upload photos to your Yandex cloud. You can generate it via [Yandex.Polygon](https://yandex.ru/dev/poligon/).

---

## Setup and Configuration

1. Obtain the required **VK** and **Yandex.Disk** tokens.
2. Insert the VK token into the `js/api/VK.js` file.
3. Configure the Yandex.Disk token in the application settings.
4. Run the application in your browser and log in.

---

## Notes

- The application requires authorization through VK and Yandex.Disk to handle personal data.
- Make sure to use valid tokens that have not expired.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

--- 

Enjoy storing your photos securely with **WebCloud (UI)**! 🌐 



# WebCloud (UI): Облачное хранилище для фото

## О чём это приложение

**WebCloud (UI)** — это веб-приложение, предназначенное для хранения фотографий из вашего профиля ВКонтакте (VK) в облаке Яндекс.Диск. Оно позволяет автоматически создавать копии фотографий и управлять ими в облаке.

---

## Основные возможности

### 📸 Получение фотографий из VK
- Программа позволяет выбрать фотографии прямо из вашего профиля VK для копирования.
  
### 👁 Предварительный просмотр
- Перед загрузкой вы можете просмотреть выбранные фотографии, чтобы убедиться в правильности выбора.

### ☁️ Отправка в облако
- Выбранные фотографии будут загружены в ваше облачное хранилище на Яндекс.Диск.

### 📂 Управление копиями
- После загрузки в облако, вы сможете просматривать, удалять или скачивать фотографии обратно на ваш компьютер.

---

## Что нужно для работы

Для корректной работы приложения потребуется:

1. **Токен VK**: Необходим для доступа к фотографиям из вашего профиля VK. Токен нужно вставить в файл `ACCESS_TOKEN` (путь: `js/api/VK.js`).
2. **ID пользователя VK**: Ваш уникальный идентификатор в VK для получения фотографий.
3. **Токен Яндекс.Диска**: Этот ключ нужен для отправки фотографий в облако Яндекса. Его можно сгенерировать через [Яндекс.Полигон](https://yandex.ru/dev/poligon/).

---

## Установка и настройка

1. Получите необходимые **токены** для VK и Яндекс.Диск.
2. Вставьте токен VK в файл `js/api/VK.js`.
3. Вставьте токен Яндекс.Диска в настройки программы.
4. Запустите приложение в браузере и авторизуйтесь.

---

## Примечания

- Программа требует авторизации через VK и Яндекс.Диск для работы с личными данными.
- Важно использовать актуальные токены, срок действия которых не истёк.
