import { NextRequest, NextResponse } from 'next/server';
import { fetchPokemon } from "@/lib/pokemonService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offsetParam = searchParams.get('offset');

  const offset = offsetParam ? parseInt(offsetParam, 10) : 0;

  if (isNaN(offset) || offset < 0) {
    return NextResponse.json({ error: 'Invalid offset or limit parameter' }, { status: 400 });
  }

  try {
    const pokemonDetails = await fetchPokemon(offset);
    return NextResponse.json(pokemonDetails);
  } catch (error) {
    console.error('API route error calling fetchPokemon:', error);
    return NextResponse.json({ error: 'Failed to fetch Pokémon data' }, { status: 500 });
  }
} 