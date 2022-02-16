import { constants } from "./constants";

export const client = {
    fetchQuotes: async () => {
        let response = await fetch(`${constants.apimEndpoint}/quote`, {
            method: 'GET'
        });
    
        let quotes = await response.json();
    
        return quotes;   
    }
}