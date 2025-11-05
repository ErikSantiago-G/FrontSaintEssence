import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
}

export function SearchBar({ searchTerm, onSearchChange, placeholder }: SearchBarProps) {
  return (
    <section className="search-bar">
      <Search size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </section>
  );
}