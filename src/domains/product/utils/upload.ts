export async function fakeUploadImagesToLikeS3(
  files: File[],
  category: string
): Promise<(string | undefined | null)[]> {
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  return Promise.all(
    files.map(async file => {
      if (!file) return file as null | undefined;

      await delay(300 + Math.random() * 500);
      return `${
        process.env.NEXT_PUBLIC_PRODUCT_FAKE_IMG_URL
      }/${category}/${Date.now()}/${encodeURIComponent(file.name)}`;
    })
  );
}
