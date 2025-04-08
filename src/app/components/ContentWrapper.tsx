"use client";

import { useState } from "react";
import { PokemonDetail } from "../types";
import Cards from "./Cards";
import styles from "./ContentWrapper.module.scss"
import TypeFilters from "./CardsUtils/TypeFilters";
import { LIMIT } from "@/lib/pokemonService";
import SearchInput from "./CardsUtils/SearchInput";

interface ContentWrapperProps {
  initialPokemonList: PokemonDetail[];
  initialOffset: number;
}

export default function ContentWrapper({ initialPokemonList, initialOffset }: ContentWrapperProps) {
    const [allPokemon, setAllPokemon] = useState<PokemonDetail[]>(initialPokemonList);
    const [offset, setOffset] = useState(initialOffset + initialPokemonList.length);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    const initialFlippedStates = Object.fromEntries(
        initialPokemonList.map(p => [p.name, true])
    );
    const [flippedStates, setFlippedStates] = useState<Record<string, boolean>>(initialFlippedStates);

    const toggleFlipped = (pokemonName: string) => {
        setFlippedStates(prevStates => ({
            ...prevStates,
            [pokemonName]: !prevStates[pokemonName]
        }));
    };

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const loadMorePokemon = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/pokemon?offset=${offset}&limit=${LIMIT}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newPokemon: PokemonDetail[] = await response.json();
            if (newPokemon.length > 0) {
                setAllPokemon(prev => [...prev, ...newPokemon]);
                setOffset(prev => prev + newPokemon.length);
                setFlippedStates(prevStates => {
                    const newStates = { ...prevStates };
                    newPokemon.forEach(p => {
                        if (!(p.name in newStates)) {
                            newStates[p.name] = true;
                        }
                    });
                    return newStates;
                });
            } else {
                console.log("No more Pokémon to load.");
            }
        } catch (error) {
            console.error("Failed to load more Pokémon:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredPokemon = allPokemon.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
        && (selectedTypes.length === 0 || p.types.some(t => selectedTypes.includes(t.type.name)))
    );

    const toggleFilter = (filter: string) => {
        setSelectedTypes(prevSelectedTypes =>
            prevSelectedTypes.includes(filter)
                ? prevSelectedTypes.filter(t => t !== filter)
                : [...prevSelectedTypes, filter]
        );
    }

    const toggleAllFlipped = () => {
        const filteredPokemonNames = filteredPokemon.map(p => p.name);
        if (filteredPokemonNames.length === 0) return; 

        const allFilteredAreFlipped = filteredPokemonNames.every(name => flippedStates[name] === true);

        setFlippedStates(prevStates => {
            const newStates = { ...prevStates };
            filteredPokemonNames.forEach(name => {
                newStates[name] = !allFilteredAreFlipped;
            });
            return newStates;
        });
    };

    return (
        <div>
            <div className={styles.contentWrapper__searchContainer}>
                <SearchInput onSearch={setSearch} searchTerm={search} />
                <button onClick={toggleAllFlipped} className={styles.contentWrapper__toggleAllButton}>
                    Toggle All
                </button>
            </div>
            <TypeFilters
                selectedTypes={selectedTypes}
                toggleFilter={toggleFilter}/>
            <Cards
                pokemonList={filteredPokemon}
                flippedStates={flippedStates}
                toggleFlipped={toggleFlipped}
            />
            <div className={styles.contentWrapper__loadMoreContainer}>
                <button
                    onClick={loadMorePokemon}
                    disabled={isLoading}
                    className={styles.contentWrapper__loadMoreButton}
                >
                    {isLoading ? 'Loading...' : 'Load More'}
                </button>
            </div>
        </div>
    );
}
