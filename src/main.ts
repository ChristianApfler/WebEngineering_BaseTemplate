import { toggleComments, renderBears } from './ui.js';
import { addComment } from './comments.js';
import { getBearData, extractBears } from './api.js';

const params: Record<string, string> = {
  action: 'parse',
  page: 'List_of_ursids',
  prop: 'wikitext',
  section: '3',
  format: 'json',
  origin: '*',
};

const init = async () => {
  toggleComments();
  addComment();

  try {
    const wikitext: string = await getBearData(params);
    const bears = await extractBears(wikitext);

    renderBears(bears);
  } catch (error) {
    console.error('Error initializing application:', error);
  }
};

init();
