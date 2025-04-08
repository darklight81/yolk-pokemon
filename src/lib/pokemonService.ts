import { PokemonApiResponse, PokemonDetail } from '@/app/types';

export const LIMIT = 20;
const TOTAL_POKEMON = 1302; // Hardcoded value from the PokeAPI response
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

async function fetchPokemonDetails(url: string): Promise<PokemonDetail | null> {
    try {
        const res = await fetch(url, { cache: 'default' });
        if (!res.ok) {
            console.error(`Failed to fetch details from ${url}: ${res.status}`);
            return null;
        }
        return await res.json() as PokemonDetail;
    } catch (error) {
        console.error(`Error fetching details from ${url}:`, error);
        return null;
    }
}

export async function fetchPokemon(offset: number): Promise<PokemonDetail[]> {
    if (offset < 0 || offset >= TOTAL_POKEMON) {
        console.warn(`Invalid offset: ${offset}. Resetting to 0.`);
        offset = 0;
    }


    const effectiveLimit = Math.min(LIMIT, TOTAL_POKEMON - offset);
    if (effectiveLimit <= 0) {
        console.log("No more Pokémon available with the current offset.");
        return [];
    }

    const listApiUrl = `${POKEAPI_BASE_URL}/pokemon/?limit=${effectiveLimit}&offset=${offset}`;

    try {
        const listResponse = await fetch(listApiUrl, { cache: 'no-store' });
        if (!listResponse.ok) {
            console.error(`HTTP error! Pokémon list fetch failed: ${listResponse.status} for URL: ${listApiUrl}`);
            return [];
        }
        const listData: PokemonApiResponse = await listResponse.json();

        const detailPromises = listData.results.map(pokemon => fetchPokemonDetails(pokemon.url));
        const results = await Promise.allSettled(detailPromises);

        return results
            .filter((result): result is PromiseFulfilledResult<PokemonDetail> => 
                result.status === 'fulfilled' && result.value !== null
            )
            .map(result => result.value);

    } catch (error) {
        console.error('Error fetching Pokémon list with details:', error);
        return [];
    }
}


export const getRandomOffset = () => Math.floor(Math.random() * (TOTAL_POKEMON - LIMIT + 1));