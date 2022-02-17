import { constants } from "./constants";

// TODO: The One API only returns 1000 quotes at a time, but there are over 1000 quotes in their db - so pagination here is needed to get all of them
export const fetchQuotes = async () => {
  let response;
  let allQuotesArray = [];
  let totalPages;
  let currentPage = 1;
  do {
    response = await fetch(
      `${constants.apimEndpoint}/quote?page=${currentPage}`,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    totalPages = json.pages;

    const pageQuotes = json.docs;
    allQuotesArray = allQuotesArray.concat(pageQuotes);

    currentPage++;
  } while (currentPage <= totalPages);

  console.log(allQuotesArray);

  return allQuotesArray;
};

export const fetchAllCharacters = async () => {
  const response = await fetch(`${constants.apimEndpoint}/character`, {
    method: "GET",
  });

  const responseJson = await response.json();

  return responseJson.docs;
};
