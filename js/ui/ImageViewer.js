/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.previewBlock = element.querySelector('.image');
    this.imagesBlock = element.querySelector('.row');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.imagesBlock.addEventListener('dblclick', (event) => {
      const image = event.target.closest('img');
      if (image) {
        this.previewBlock.src = image.src;
      }
    });

    this.imagesBlock.addEventListener('click', (event) => {
      const image = event.target.closest('img');
      if (image) {
        this.previewBlock.src = image.src;
        image.classList.toggle('selected');
        this.checkButtonText();
      }
    });

    const selectAllBtn = this.element.querySelector('.select-all');
    selectAllBtn.addEventListener('click', () => {
      const images = Array.from(this.imagesBlock.querySelectorAll('img'));
      const hasSelectedImages = images.some((image) => image.classList.contains('selected'));

      if (hasSelectedImages) {
        images.forEach((image) => image.classList.remove('selected'));
      } else {
        images.forEach((image) => image.classList.add('selected'));
      }

      this.checkButtonText();
    });

    const viewDownloadedBtn = this.element.querySelector('.show-uploaded-files');
    viewDownloadedBtn.addEventListener('click', () => {
      const modal = App.getModal('filePreviewer');
      modal.open();
      Yandex.getUploadedFiles((images) => {
        if (images) {
          if (images.items == '') {
            alert('Нет доступных изображений.')
            modal.close()
          } else {
            modal.showImages(images.items)
          }
        } else {
          modal.close()
        }
      });
    });

    const sendToDiskBtn = this.element.querySelector('.send');
    sendToDiskBtn.addEventListener('click', () => {
      const modal = App.getModal('fileUploader');
      const selectedImages = this.imagesBlock.querySelectorAll('.selected');
      modal.open();
      modal.showImages(selectedImages);
    });
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    const images = document.querySelectorAll('.image-wrapper');
    images.forEach((image) => {
      image.remove()
    })
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      const selectAllBtn = this.element.querySelector('.select-all');
      selectAllBtn.classList.remove('disabled');
    } else {
      const selectAllBtn = this.element.querySelector('.select-all');
      selectAllBtn.classList.add('disabled');
    }

    const imageMarkup = images.map((image) => {
      return `<div class='four wide column ui medium image-wrapper'><img src='${image}' /></div>`;
    });

    this.imagesBlock.insertAdjacentHTML('afterbegin', imageMarkup.join(''));

  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const images = Array.from(this.imagesBlock.querySelectorAll('img'));
    const selectAllBtn = this.element.querySelector('.select-all');
    const sendToDiskBtn = this.element.querySelector('.send');

    if (images.every((image) => image.classList.contains('selected'))) {
      selectAllBtn.textContent = 'Снять выделение';
    } else {
      selectAllBtn.textContent = 'Выбрать всё';
    }

    if (images.some((image) => image.classList.contains('selected'))) {
      sendToDiskBtn.classList.remove('disabled');
    } else {
      sendToDiskBtn.classList.add('disabled');
    }
  };
};