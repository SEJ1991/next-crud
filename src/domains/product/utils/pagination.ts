import { ITEM_OFFSET } from '@/domains/product';

export function getSkip(page: number) {
  return (page - 1) * ITEM_OFFSET;
}

export function getNowPage(skip: number) {
  return Math.floor(skip / ITEM_OFFSET) + 1;
}

export function getLastPage(total: number) {
  return Math.ceil((total - 1) / ITEM_OFFSET);
}

export function getPages(skip: number, total: number) {
  const pageOffset = 5;
  const lastPage = getLastPage(total);
  const nowPage = skip / ITEM_OFFSET + 1;
  const nowIndex = nowPage % pageOffset === 0 ? pageOffset - 1 : (nowPage % pageOffset) - 1;
  const pages: number[] = [];

  for (let index = 0; index < pageOffset; index++) {
    const nowSubNumber = index - nowIndex;
    const page = nowPage + nowSubNumber;

    if (page >= 1 && page <= lastPage) {
      pages.push(page);
    }
  }

  return pages;
}
