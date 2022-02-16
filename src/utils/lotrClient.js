import { constants } from "./constants";

const fetchRandomQuote = async () => {
    const response = await fetch(`${constants.apimEndpoint}/quote`, {
        method: 'GET'
    });

    return response;
}

const fetchCharacterById = async id => {
    const response = await fetch(`${constants.apimEndpoint}/character/${id}`, {
        method: 'GET'
    });

    return response;
}
    
export const client = {

    fetchRandomCharacterQuote: async () => {
        const quoteResponse = await fetchRandomQuote();
        const quoteJson = await quoteResponse.json();
        const characterResponse = await fetchCharacterById(quoteJson.docs[0].character);
        const characterJson = await characterResponse.json();

        const characterQuote = {
            character: characterJson,
            quote: quoteJson
        };

        return characterQuote;
    }
}