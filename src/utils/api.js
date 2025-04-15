import { PIXABAY_API_KEY } from "../config";

export const searchImagesFromPixabay = async (query) => {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`
    );
    const data = await res.json();
    return data.hits;
  } catch (err) {
    console.error("Error fetching images:", err);
    return [];
  }
};
