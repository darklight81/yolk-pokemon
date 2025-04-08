import { PokemonTypeEnum, typeColorMap } from "@/app/types";
import styles from './TypeFilters.module.scss'; 

export default function TypeFilters({ toggleFilter, selectedTypes }: {
    toggleFilter: (filter: string) => void;
    selectedTypes: string[];
}) {
    return (
        <div className={styles.filterContainer}>
            {Object.values(PokemonTypeEnum).map((type) => {
                const colors = typeColorMap[type];
                const isSelected = selectedTypes.includes(type);

                return (
                    <button
                        key={type}
                        className={`${styles.filterButton} ${isSelected ? styles.filterButton__selected : ''}`}
                        style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            border: colors.border,
                        }}
                        onClick={() => toggleFilter(type)}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
}