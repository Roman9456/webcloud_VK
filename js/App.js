/**
 * Класс App управляет всем приложением
 * */
class App {
  /**
   * С вызова этого метода начинается работа всего приложения
   * Он производит перваоначальную настройку блоков поиска и просмотра изображений,
   * а так же всплывающих окон.
   * */
  static init() {
    this.searchBlock = new SearchBlock(document.getElementsByClassName('search-block')[0]);
    this.imageViewer = new ImageViewer(document.getElementsByClassName('images-wrapper')[0]);
    this.initModals();
  }

  /**
   * Инициализирует всплывающее окна
   * */
  static initModals() {
    const fileUploaderElement = $('.ui.modal.file-uploader-modal')[0];
    const filePreviewerElement = $('.ui.modal.uploaded-previewer-modal')[0];

    this.modals = {
      fileUploader: new FileUploaderModal(fileUploaderElement),
      filePreviewer: new PreviewModal(filePreviewerElement),
    };

    // Apply modal options after creating the modal objects
    $(fileUploaderElement).modal({ closable: false });
    $(filePreviewerElement).modal({ closable: false });
  }

   /**
   * Возвращает всплывающее окно
   * Обращается к объекту App.modals и извлекает
   * из него свойство modalName:
   * App.getModal( 'login' ); // извелекает App.modals.login
   * */
  static getModal(name) {
    return this.modals[name];
  }
}
