import { mockCharacters } from '../../../../data/mockCharacters';

export function generateStaticParams() {
  return mockCharacters.map(character => ({
    id: character.id,
  }));
}
