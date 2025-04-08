import Header from "./components/Header";
import ContentWrapper from "@/app/components/ContentWrapper";
import { fetchPokemon, getRandomOffset } from "@/lib/pokemonService";

export default async function Home() {
  const initialOffset = getRandomOffset();
  const pokemonList = await fetchPokemon(initialOffset);

  return (
      <div className="app" id="I play pokemon go every day!">
        <Header/>
        <ContentWrapper
          initialPokemonList={pokemonList}
          initialOffset={initialOffset}
        />
      </div>
  );
}
