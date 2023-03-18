export default function createUrlForImage(numericOfImage: string): string {
  const urlImage = `https://raw.githubusercontent.com/alchonokk/image-data/master/img/${numericOfImage}.jpg`;
  return urlImage;
}
