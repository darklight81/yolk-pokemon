export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}
interface NamedAPIResource {
    name: string;
    url: string;
}

interface Ability {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
}

interface VersionDetail {
    rarity: number;
    version: NamedAPIResource;
}

interface HeldItem {
    item: NamedAPIResource;
    version_details: VersionDetail[];
}

interface MoveLearnMethod {
    name: string;
    url: string;
}

interface VersionGroupDetail {
    level_learned_at: number;
    version_group: NamedAPIResource;
    move_learn_method: MoveLearnMethod;
}

interface Move {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
}

interface DreamWorldSprites {
    front_default: string | null;
    front_female: string | null;
}

interface HomeSprites {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
}

interface OfficialArtworkSprites {
    front_default: string | null;
    front_shiny: string | null;
}

interface ShowdownSprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
}

interface OtherSprites {
    dream_world: DreamWorldSprites;
    home: HomeSprites;
    "official-artwork": OfficialArtworkSprites;
    showdown: ShowdownSprites;
}

interface VersionSprites {
    back_default?: string;
    back_gray?: string;
    front_default?: string;
    front_gray?: string;
    back_female?: string | null;
    back_shiny?: string | null;
    back_shiny_female?: string | null;
    front_female?: string | null;
    front_shiny?: string | null;
    front_shiny_female?: string | null;
}

interface GenerationISprites {
    "red-blue": VersionSprites;
    yellow: VersionSprites;
}

interface GenerationIISprites {
    crystal: VersionSprites;
    gold: VersionSprites;
    silver: VersionSprites;
}

interface GenerationIIISprites {
    emerald: VersionSprites;
    "firered-leafgreen": VersionSprites;
    "ruby-sapphire": VersionSprites;
}

interface GenerationIVSprites {
    "diamond-pearl": VersionSprites;
    "heartgold-soulsilver": VersionSprites;
    platinum: VersionSprites;
}

interface Sprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other?: OtherSprites;
    versions?: {
        "generation-i"?: GenerationISprites;
        "generation-ii"?: GenerationIISprites;
        "generation-iii"?: GenerationIIISprites;
        "generation-iv"?: GenerationIVSprites;
    };
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
}

export interface PokemonDetail {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    held_items: HeldItem[];
    location_area_encounters: string;
    moves: Move[];
    types: PokemonType[];
    species: NamedAPIResource;
    sprites: Sprites;
    stats: PokemonStat[];
}

export interface TypeColors {
    border: string;
    bg: string;
    text: string;
}

export enum PokemonTypeEnum {
    Normal = 'normal',
    Fighting = 'fighting',
    Flying = 'flying',
    Poison = 'poison',
    Ground = 'ground',
    Rock = 'rock',
    Bug = 'bug',
    Ghost = 'ghost',
    Steel = 'steel',
    Fire = 'fire',
    Water = 'water',
    Grass = 'grass',
    Electric = 'electric',
    Psychic = 'psychic',
    Ice = 'ice',
    Dragon = 'dragon',
    Dark = 'dark',
    Fairy = 'fairy',
    Stellar = 'stellar',
    Unknown = 'unknown',
}

export const typeColorMap: Record<PokemonTypeEnum, TypeColors> = {
    [PokemonTypeEnum.Normal]:   { border: '1px solid #D1D5DB', bg: '#D1D5DB', text: '#000000' },
    [PokemonTypeEnum.Fighting]: { border: '1px solid #9B2C2C',  bg: '#9B2C2C',  text: '#FFFFFF' },
    [PokemonTypeEnum.Flying]:   { border: '1px solid #A3BFFA', bg: '#A3BFFA', text: '#000000' },
    [PokemonTypeEnum.Poison]:   { border: '1px solid #6B21A8', bg: '#6B21A8', text: '#FFFFFF' },
    [PokemonTypeEnum.Ground]:   { border: '1px solid #D97706', bg: '#D97706', text: '#FFFFFF' },
    [PokemonTypeEnum.Rock]:     { border: '1px solid #B45309', bg: '#B45309', text: '#FFFFFF' },
    [PokemonTypeEnum.Bug]:      { border: '1px solid #84CC16', bg: '#84CC16', text: '#000000' },
    [PokemonTypeEnum.Ghost]:    { border: '1px solid #4C1D95', bg: '#4C1D95', text: '#FFFFFF' },
    [PokemonTypeEnum.Steel]:    { border: '1px solid #6B7280', bg: '#6B7280', text: '#FFFFFF' },
    [PokemonTypeEnum.Fire]:     { border: '1px solid #FB923C', bg: '#FB923C', text: '#FFFFFF' },
    [PokemonTypeEnum.Water]:    { border: '1px solid #3B82F6', bg: '#3B82F6', text: '#FFFFFF' },
    [PokemonTypeEnum.Grass]:    { border: '1px solid #10B981', bg: '#10B981', text: '#FFFFFF' },
    [PokemonTypeEnum.Electric]: { border: '1px solid #F59E0B', bg: '#F59E0B', text: '#000000' },
    [PokemonTypeEnum.Psychic]:  { border: '1px solid #EC4899', bg: '#EC4899', text: '#FFFFFF' },
    [PokemonTypeEnum.Ice]:      { border: '1px solid #A5F3FC', bg: '#A5F3FC', text: '#000000' },
    [PokemonTypeEnum.Dragon]:   { border: '1px solid #6B21A8', bg: '#6B21A8', text: '#FFFFFF' },
    [PokemonTypeEnum.Dark]:     { border: '1px solid #374151', bg: '#374151', text: '#FFFFFF' },
    [PokemonTypeEnum.Fairy]:    { border: '1px solid #F9A8D4', bg: '#F9A8D4', text: '#000000' },
    [PokemonTypeEnum.Stellar]:  { border: '1px solid #14B8A6', bg: '#14B8A6', text: '#000000' },
    [PokemonTypeEnum.Unknown]:  { border: '1px solid #D1D5DB', bg: '#D1D5DB', text: '#000000' },
};