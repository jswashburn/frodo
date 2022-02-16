import { constants } from "./constants";

export const client = {
    fetchQuotes: async () => {
        const response = await fetch(`${constants.apimEndpoint}/quote`, {
            method: 'GET'
        });
    
        const quotes = await response.json();
    
        return quotes;   
    },

    fetchCharacterById: async id => {
        const response = await fetch(`${constants.apimEndpoint}/character/${id}`, {
            method: 'GET'
        });

        const character = await response.json();

        return character;
    }
}