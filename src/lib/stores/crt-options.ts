import { writable } from 'svelte/store';

export const mainImage = writable<string>();

// <input type="file"> のハンドリング用
export const onMainImageFileSelected = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
  const file = e.currentTarget.files?.[0];
  if (file) {
    const blobUri = window.URL.createObjectURL(file);
    mainImage.set(blobUri);
  }
};
