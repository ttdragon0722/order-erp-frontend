"use client"
import { useState, useEffect } from "react";

type SearchInputProps = {
    queryFunc: (query: string) => void;
    onChange?: (query: string) => void;
    classname?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ queryFunc, onChange, classname = "" }) => {
    const [query, setQuery] = useState("");
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        if (query.trim() !== "") {
            const timeout = setTimeout(() => {
                queryFunc(query);
            }, 500);
            setTypingTimeout(timeout);
        }

        onChange?.(query);

        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [query]);

    return (
        <input
            type="text"
            className={`border rounded-lg p-2 w-full ${classname}`}
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
};

export default SearchInput;
