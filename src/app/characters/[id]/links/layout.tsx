import { mockCharacters } from '../../../../data/mockCharacters';

export function generateStaticParams() {
  return mockCharacters.map((character) => ({
    id: character.id,
  }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
