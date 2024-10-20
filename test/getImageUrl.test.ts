import { describe, it, expect } from 'vitest';
import { getImageUrl } from '../src/api.ts'; // Adjust the import path

// Define the Page interface to match your implementation
interface ImageInfo {
  url: string;
}

interface Page {
  pageid: number; // Assuming pageid is of type number
  ns: number; // Assuming ns is of type number
  title: string; // Assuming title is of type string
  imageinfo: ImageInfo[]; // This is an array of ImageInfo objects
}

describe('getImageUrl', () => {
  const placeholderImage = '/media/placeholder.png';

  it('should return the image URL if imageinfo is available', () => {
    const page: Page = {
      pageid: 1,
      ns: 0,
      title: 'Test Bear',
      imageinfo: [
        {
          url: 'https://example.com/bear.jpg',
        },
      ],
    };

    const imageUrl = getImageUrl(page, placeholderImage);
    expect(imageUrl).toBe('https://example.com/bear.jpg');
  });

  it('should return the placeholder image if imageinfo is not available', () => {
    const pageWithoutImageInfo: Page = {
      pageid: 1,
      ns: 0,
      title: 'Test Bear',
      imageinfo: [],
    };

    const imageUrl = getImageUrl(pageWithoutImageInfo, placeholderImage);
    expect(imageUrl).toBe(placeholderImage);
  });

  it('should return the placeholder image if imageinfo is undefined', () => {
    const pageWithUndefinedImageInfo: Page = {
      pageid: 1,
      ns: 0,
      title: 'Test Bear',
      imageinfo: [],
    };

    const imageUrl = getImageUrl(pageWithUndefinedImageInfo, placeholderImage);
    expect(imageUrl).toBe(placeholderImage);
  });
});
