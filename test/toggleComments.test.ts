// toggleComments.test.ts
import { describe, it, expect, beforeEach } from 'vitest';

// Import the function to test
import { toggleComments } from '../src/ui.ts';

describe('toggleComments', () => {
  // Set up the HTML structure before each test
  beforeEach(() => {
    // Create elements for the test
    document.body.innerHTML = `
      <button class="show-hide">Show comments</button>
      <div class="comment-wrapper"></div>
    `;

    // Call the function to attach the event listener
    toggleComments();
  });

  it('should initially hide the comments', () => {
    const commentWrapper = document.querySelector(
      '.comment-wrapper'
    ) as HTMLElement;
    expect(commentWrapper.style.display).toBe('none');
  });

  it('should show comments when the button is clicked', () => {
    const showHideBtn = document.querySelector(
      '.show-hide'
    ) as HTMLButtonElement;
    showHideBtn.click(); // Simulate button click

    const commentWrapper = document.querySelector(
      '.comment-wrapper'
    ) as HTMLElement;
    expect(commentWrapper.style.display).toBe('block');
    expect(showHideBtn.textContent).toBe('Hide comments'); // Check if the button text is updated
  });

  it('should hide comments when the button is clicked again', () => {
    const showHideBtn = document.querySelector(
      '.show-hide'
    ) as HTMLButtonElement;
    showHideBtn.click(); // Show comments first
    showHideBtn.click(); // Click again to hide comments

    const commentWrapper = document.querySelector(
      '.comment-wrapper'
    ) as HTMLElement;
    expect(commentWrapper.style.display).toBe('none');
    expect(showHideBtn.textContent).toBe('Show comments'); // Check if the button text is updated back
  });
});
