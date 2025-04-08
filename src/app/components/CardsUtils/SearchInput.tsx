"use client";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
    onSearch: (searchTerm: string) => void;
    searchTerm: string;
}

export default function SearchInput({ onSearch, searchTerm }: SearchInputProps) {

    return (
        <input
            type="text"
            className={styles.searchInput}
            value={searchTerm ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
            placeholder="Search Pokémon..."
        />
    )
}