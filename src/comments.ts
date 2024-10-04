export const addComment = (): void => {
  const form = document.querySelector(
    '.comment-form'
  ) as HTMLFormElement | null;
  const nameField = document.querySelector('#name') as HTMLInputElement | null;
  const commentField = document.querySelector(
    '#comment'
  ) as HTMLInputElement | null;
  const list = document.querySelector(
    '.comment-container'
  ) as HTMLElement | null;

  // Check if any of the required elements are null
  if (!form || !nameField || !commentField || !list) {
    console.error('Required elements are missing in the DOM.');
    return; // Exit if any element is not found
  }

  // Add event listener for form submission
  form.onsubmit = (e: Event): void => {
    e.preventDefault(); // Prevent the default form submission

    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');

    const nameValue = nameField.value;
    const commentValue = commentField.value;

    namePara.textContent = nameValue; // Set name paragraph content
    commentPara.textContent = commentValue; // Set comment paragraph content

    // Append elements to the comment list
    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    // Clear input fields
    nameField.value = '';
    commentField.value = '';
  };
};
