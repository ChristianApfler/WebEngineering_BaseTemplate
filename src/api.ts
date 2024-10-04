const baseUrl = 'https://en.wikipedia.org/w/api.php';

// Define interfaces to represent the structure of the API response
interface ImageInfo {
  url: string;
}

interface Page {
  pageid: number;
  ns: number;
  title: string;
  imageinfo: ImageInfo[];
}

interface Query {
  pages: Record<string, Page>;
}

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const placeholderImage = '/media/placeholder.png'; // TODO
  try {
    const imageParams = {
      action: 'query',
      titles: `File:${fileName}`,
      prop: 'imageinfo',
      iiprop: 'url',
      format: 'json',
      origin: '*',
    };

    const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
    const res = await fetch(url);

    // Check if the response is ok
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const data = await res.json();

    const pages: Query = data.query; // Cast the data to the Query type
    const page = Object.values(pages.pages)[0]; // Access the first page

    // Check if imageInfo is not undefined
    if (page.imageinfo && page.imageinfo.length > 0) {
      const imageUrl = page.imageinfo[0].url;
      return imageUrl;
    } else {
      return placeholderImage; // Return placeholder image if not found
    }
  } catch (error) {
    console.error(`Error fetching image for ${fileName}:`, error);
    return placeholderImage; // Return placeholder on error
  }
};

export const getBearData = async (
  params: Record<string, string>
): Promise<string> => {
  try {
    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const data = await res.json();
    return data.parse.wikitext['*'];
  } catch (error) {
    console.error('Error fetching bear data', error);
    throw error; // Rethrow error to handle it in main.ts
  }
};

export const extractBears = async (wikitext: string): Promise<Bear[]> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|]*)/); // Capture range value before first pipe

      if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        const imageUrl = await fetchImageUrl(fileName);

        const bear: Bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: rangeMatch[1].trim(), // Extracted and trimmed range
        };
        bears.push(bear);
      }
    }
  }
  return bears;
};

// Define the Bear interface
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}
