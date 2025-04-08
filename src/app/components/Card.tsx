"use client"

import {PokemonDetail, PokemonType, TypeColors, PokemonTypeEnum, typeColorMap} from "@/app/types";
import styles from './Card.module.scss';
import Image from "next/image";

const formatId = (id: number): string => {
    return '#' + String(id).padStart(3, '0');
}
const getTypeColors = (types: PokemonType[]): TypeColors => {
    const primaryType = (types?.[0]?.type?.name || 'unknown') as PokemonTypeEnum;
    const validKey = Object.values(PokemonTypeEnum).includes(primaryType) ? primaryType : PokemonTypeEnum.Unknown;
    return typeColorMap[validKey];
}

interface CardProps {
    pokemon: PokemonDetail;
    isFlipped: boolean;
    toggleFlipped: () => void;
}

export default function Card({ pokemon, isFlipped, toggleFlipped }: CardProps) {
    const typeColors = getTypeColors(pokemon.types);

    return (
        <div className={`${styles.flipCard} ${isFlipped ? styles.flipped : ''}`} onClick={toggleFlipped}>
            <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront} style={{ borderColor: typeColors.border, backgroundColor: typeColors.bg }}>
                    <div>
                        <Image
                            src={pokemon.sprites.other?.["official-artwork"].front_default || ''}
                            alt={pokemon.name}
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                    <h2 className={styles.card__title} style={{ color: typeColors.text }}>{pokemon.name.toUpperCase()}</h2>
                    <p style={{ color: typeColors.text }}>{formatId(pokemon.id)}</p>
                    <div className={styles.card__types}>
                        {pokemon.types.map((type, index) => (
                            <span key={index} className={styles.card__types__type} style={{ color: typeColors.text }}>
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                    <div className={styles.card__stats}>
                        {pokemon.stats.slice(0, 3).map((stat, index) => (
                            <div key={index}>
                                <div className={styles.card__stats__label} style={{ color: typeColors.text }}>
                                    {stat.stat.name.toUpperCase()}
                                </div>
                                <div className={styles.card__stats__value} style={{ color: typeColors.text }}>
                                    {stat.base_stat}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.card__cardBorder}></div>
                </div>

                <div className={styles.flipCardBack}>
                    <Image
                        src="/images/card-back.jpg"
                        alt="Card Back"
                        layout="fill"
                        objectFit="cover"
                        className={styles.cardBackImage}
                    />
                    <div className={styles.card__cardBorder}></div>
                </div>
            </div>
        </div>
    );
}
