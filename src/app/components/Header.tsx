import styles from './Header.module.scss';
import Image from "next/image";
import Link from "next/link";
export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <Image
                    src="/images/pokemon_logo.png"
                    alt="Pokémon Logo"
                    className={styles.header__logo}
                    width={200}
                    height={200}
                />
            </Link>
        </header>
    );
}
