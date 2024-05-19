/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = ({ method, url, headers, callback }) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(xhr.response);
        } else {
            alert(xhr.response.message);
            localStorage.removeItem('yandexToken');
            callback(null);
        }
      }
    };
    try {
      xhr.open(method, url);
      if (headers) {
        for (const [header, value] of Object.entries(headers)) {
          xhr.setRequestHeader(header, value);
        }
      }
      xhr.send();
    } catch (err) {
      alert(err);
    }
};
