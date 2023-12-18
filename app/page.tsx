"use client";
import {
  Text,
  Autocomplete,
  rem,
  Card,
  Image,
  CardSection,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/debounce";
import Books from "./components/books";
import basicfetch from "./utils/basicfetch";

interface BooksInterface {
  items: any[];
  kind: string;
  totalItems: number;
  maxResults: number;
}

export default function Home() {
  const searchIcon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [books, setBooks] = useState<BooksInterface | null>(null);
  const [activePage, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const maxResults = 10

  async function getBooks(searchText: string, activePage: number) {
    await basicfetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchText}&startIndex=${activePage*maxResults}&maxResults=${maxResults}`
    ).then((data) => {
      setIsLoading(false);
      data.maxResults = maxResults;
      setBooks(data);
    });
    
  }

  useEffect(() => {
    if (debouncedSearchText) {
      setIsLoading(true);
      getBooks(debouncedSearchText, activePage-1);
    }
  }, [debouncedSearchText, activePage]);

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <CardSection>
            <Image
              src="/images/home-page.jpg"
              width={600}
              height={600}
              alt="No way!"
              radius="md"
              component={NextImage}
            />
          </CardSection>
          <Text size="xl" my={5} className="flex justify-center font-bold">
            Welcome to Book Paradise
          </Text>
          <TextInput
            leftSection={searchIcon}
            placeholder="Search by book or author or title"
            value={searchText}
            onChange={(event) => setSearchText(event.currentTarget.value)}
            onSubmit={(val) => console.log(val)}
          />
        </Card>
      </div>
      {books && books?.items?.length ? <Books booksObj={books} pageState={[activePage, setPage]} isLoading={isLoading} /> : <></>}
    </>
  );
}
