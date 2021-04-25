// 21282828-952539dd41090b14fbece8909

export default function apiServise(query, page) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=21282828-952539dd41090b14fbece8909`,
  )
    .then(resp => resp.json())
    .then(data => data);
}
