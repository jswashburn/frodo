export const getAllDocs = async route => {
  let response;
  let allDocs = [];
  let totalPages;
  let currentPage = 1;
  do {
    response = await fetch(
      `${process.env.REACT_APP_THEONE_BASE_URL}/${route}?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
        }
      }
    );

    const json = await response.json();
    totalPages = json.pages;

    const docs = json.docs;
    allDocs = allDocs.concat(docs);

    currentPage++;
  } while (currentPage <= totalPages);

  return allDocs;
};
