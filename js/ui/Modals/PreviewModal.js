/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.element = element;
    this.imageContainer = element.querySelector('.content');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    const closeButton = this.element.querySelector('.x.icon');
    closeButton.addEventListener('click', () => {
      this.close();
    });

    this.imageContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('delete')) {
        const imageContainer = target.closest('.image-preview-container');
        const iconElement = target.querySelector('i');
        const path = target.dataset.path;
  
        iconElement.classList.add('icon', 'spinner', 'loading');
        target.classList.add('disabled');
  
        Yandex.removeFile(path, (response) => {
          if (response === null) {
            imageContainer.remove();
          } else {
            iconElement.classList.remove('icon', 'spinner', 'loading');
            target.classList.remove('disabled');
          }
        });
      } else if (target.classList.contains('download')) {
        const file = target.dataset.file;
        Yandex.downloadFileByUrl(file);
      }
    });
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    const imageMarkup = data.reverse().map((item) => this.getImageInfo(item)).join('');
    this.imageContainer.innerHTML = imageMarkup;
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleString('ru-RU', options);
  } 

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    const { preview, name, created, size, path, file } = item;
    const formattedDate = this.formatDate(created);
    return `<div class="image-preview-container">
              <img src='${preview}' />
              <table class="ui celled table">
                <thead>
                  <tr><th>Name</th><th>Created</th><th>Size</th></tr>
                </thead>
                <tbody>
                  <tr><td>${name}</td><td>${formattedDate}</td><td>${size} KB</td></tr>
                </tbody>
              </table>
              <div class="buttons-wrapper">
                <button class="ui labeled icon red basic button delete" data-path='${path}'>
                  Delete
                  <i class="trash icon"></i>
                </button>
                <button class="ui labeled icon violet basic button download" data-file='${file}'>
                  Download
                  <i class="download icon"></i>
                </button>
              </div>
            </div>`;
  }
}
