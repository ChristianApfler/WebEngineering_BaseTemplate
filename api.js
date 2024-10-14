
const baseUrl = "https://en.wikipedia.org/w/api.php";

export const fetchImageUrl = async (fileName) => {
  const placeholderImage = "/media/placeholder.png"; //TODO
  try {
    const imageParams = {
      action: "query",
      titles: `File:${fileName}`,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*"
    };

    const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
    const res = await fetch(url);
    const data = await res.json();

    const pages = data.query.pages;
    const imageUrl = Object.values(pages)[0].imageinfo[0].url;
    return imageUrl;

  } catch (error) {
    console.error(`Error fetching image for ${fileName}:`, error);
    return placeholderImage;
  }
};

export const getBearData = async (params) => {
  try {
    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.parse.wikitext['*'];
  } catch (error) {
    console.error('Error fetching bear data', error);
    throw error;
  }
};

export const extractBears = async (wikitext) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|]*)/);

      if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        const imageUrl = await fetchImageUrl(fileName);

        const bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: rangeMatch[1].trim() 
        };
        bears.push(bear);
      }
    }
  }
  return bears;
};
