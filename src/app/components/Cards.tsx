import {PokemonDetail} from "@/app/types";
import styles from './Cards.module.scss';
import Card from "@/app/components/Card";

interface CardsProps {
    pokemonList: PokemonDetail[];
    flippedStates: Record<string, boolean>; 
    toggleFlipped: (pokemonName: string) => void; 
}

export default function Cards({ pokemonList, flippedStates, toggleFlipped }: CardsProps) {
    return (
        <div className={styles.cards}>
            {pokemonList.map((pokemon) => (
                <Card
                    key={pokemon.id}
                    pokemon={pokemon}
                    isFlipped={flippedStates[pokemon.name] || false}
                    toggleFlipped={() => toggleFlipped(pokemon.name)}
                />
            ))}
        </div>
    );
}
