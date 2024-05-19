
class VK {
  static ACCESS_TOKEN = 'vk1.a.LrJ8oTceG7gKP1zK4N7q4gyHIkdanWvLyU6soAmVs4Uc05QSo5A5JjmV3e0KHN9GSwzeMJ-ROzgr4kakqBxYXmum9FDKOPtNNCtlErcDDcorwWuYMXYHC0PYGDTPZ4S-bDjenpswTPjqbnAN2T-6ZKvLvNHpv-U3kLYOgA28u2izmpKzZcOilSLB1vMFvoTLzMULHTOBg35rBT8i2nr-AQ';
  static lastCallback;


  static get(id = '', callback){
    VK.lastCallback = callback;
    const script = document.createElement('script');
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${VK.ACCESS_TOKEN}&v=5.131&callback=VK.processData`;
    document.body.appendChild(script);
    window.vkCallback = (result) => {
      VK.processData(result);
    };
  }


  static processData(result){
    const script = document.querySelector('script[src^="https://api.vk.com/method/photos.get"]');
    if (script) {
      script.remove();
    }
    if (result.error) {
      alert(result.error.error_msg);
      return;
    }
    const images = [];
    for (const item of result.response.items) {
      let sizes = item.sizes;
      let max_size = sizes.reduce((prev, current) => {
        const prevArea = prev.width * prev.height;
        const currentArea = current.width * current.height;
        return prevArea > currentArea ? prev : current;
      });
      images.push(max_size.url);
    }
    VK.lastCallback(images);
    VK.lastCallback = () => {};
  }
};