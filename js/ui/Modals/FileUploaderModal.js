/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
   constructor( element ) {
      super(element);
      this.element = element;
      this.imageContainer = element.querySelector('.scrolling.content');
      this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю ввода
   * отправляет одно изображение, если клик был по кнопке отправки
   * 5. Клик по кнопке "Назначить общий путь", вызывает метод assignCommonPath
   */
   registerEvents(){
      const closeButton = this.element.querySelector('.x.icon');
      const sendAllButton = this.element.querySelector('.send-all');
      const commonPathButton = this.element.querySelector('.ui.common-path.button');

      closeButton.addEventListener('click', () => {
         this.close();
      });

      sendAllButton.addEventListener('click', () => {
         this.sendAllImages();
      });

      commonPathButton.addEventListener('click', () => {
         this.assignCommonPath();
      });

      this.imageContainer.addEventListener('click', (event) => {
         const target = event.target;
         const imageContainer = target.closest('.image-preview-container');
         if (target.tagName == 'INPUT') {
            target.classList.remove('error');
         } else if (target.tagName == 'I') {
            this.sendImage(imageContainer);
         }
      });
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
   showImages(images) {
      const imageArray = Array.from(images);
      const imageMarkup = imageArray.reverse().map((item) => this.getImageHTML(item)).join('');
      this.imageContainer.innerHTML = imageMarkup;
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
   getImageHTML(item) {
      return `<div class="image-preview-container">
                  <img src='${item.src}' />
                  <div class="ui action input">
                     <input type="text" placeholder="File path">
                     <button class="ui button"><i class="upload icon"></i></button>
                  </div>
               </div>`;
   }

  /**
   * Отправляет все изображения в облако
   */
   sendAllImages() {
      const imageContainers = this.element.querySelectorAll('.image-preview-container');
      imageContainers.forEach((container) => {
         this.sendImage(container);
      });
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
   sendImage(imageContainer) {
      const inputField = imageContainer.querySelector('input');
      const imagePath = inputField.value.trim()

      if (imagePath == '') {
         imageContainer.classList.add('error');
         return;
      }

      inputField.disabled = true;

      const imageElement = imageContainer.querySelector('img');
      const imageUrl = imageElement.src;

      Yandex.uploadFile(imagePath, imageUrl, () => {
         imageContainer.remove();
         const remainingImages = this.element.querySelectorAll('.image-preview-container');
         if (remainingImages.length == 0) {
            this.close();
         }
      });
   }

  /**
   * Назначает общий путь для всех изображений
   */
  assignCommonPath() {
   // Запрашиваем общий путь для всех изображений
   const commonPath = prompt('Введите общий путь:');

   // Получаем все контейнеры изображений
   const imageContainers = this.element.querySelectorAll('.image-preview-container');

   // Создаем общую папку на Яндекс.Диске
   Yandex.createFolder(commonPath, (folderUrl) => {
      // Перебираем все контейнеры изображений
      imageContainers.forEach((container) => {
         const inputField = container.querySelector('input');
         const imagePath = inputField.value.trim();

         // Определяем имя файла из URL изображения из ВКонтакте
         const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1);

         // Определяем URL изображения из ВКонтакте
         const imageUrl = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);

         // Определяем путь для загрузки на Яндекс.Диск
         const uploadPath = `${folderUrl}/${imageName}`;

         // Отправляем изображение на Яндекс.Диск
         Yandex.uploadFile(uploadPath, imageUrl, () => {
            // Обработка успешной загрузки
            inputField.disabled = true;
            container.remove();

            const remainingImages = this.element.querySelectorAll('.image-preview-container');
            if (remainingImages.length == 0) {
               this.close();
            }
         });
      });
   });
}
}
