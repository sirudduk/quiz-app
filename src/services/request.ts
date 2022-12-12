export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
}

const API_BASE_URL = 'https://opentdb.com/api.php';

export default function request(url: string, options: HTTP_METHOD) {
  return fetch(`${API_BASE_URL}/${url}`, {
    method: options,
  }).then((response) => {
    return response.json();
  });
}
