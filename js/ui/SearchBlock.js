/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element;
    this.replaceButton = element.querySelector('.replace');
    this.addButton = element.querySelector('.add');
    this.searchInput = element.querySelector('input');
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents() {
    const handleButtonClick = (e) => {
      const userId = this.searchInput.value;
      if (!userId) return;
      
      VK.get(userId, (images) => {
        const imageViewer = App.imageViewer;
        if (this.replaceButton == e.target) {
          imageViewer.clear();
        }
        imageViewer.drawImages(images);
      });
    };

    this.replaceButton.addEventListener('click', handleButtonClick);
    this.addButton.addEventListener('click', handleButtonClick);
  }
}