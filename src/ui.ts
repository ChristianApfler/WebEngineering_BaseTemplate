export const toggleComments = (): void => {
  const showHideBtn = document.querySelector('.show-hide') as HTMLButtonElement;
  const commentWrapper = document.querySelector(
    '.comment-wrapper'
  ) as HTMLElement;

  // Initially hide the comment wrapper
  commentWrapper.style.display = 'none';
  showHideBtn.onclick = () => {
    const showHideText = showHideBtn.textContent;

    if (showHideText === 'Show comments') {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
    }
  };
};

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export const renderBears = (bears: Bear[]): void => {
  const moreBearsSection = document.querySelector('.more_bears') as HTMLElement;
  moreBearsSection.innerHTML = ''; // Clear existing content

  bears.forEach((bear) => {
    moreBearsSection.innerHTML += `
          <div>
              <h3>${bear.name} (${bear.binomial})</h3>
              <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
              <p><strong>Range:</strong> ${bear.range}</p>
          </div>
      `;
  });
};
