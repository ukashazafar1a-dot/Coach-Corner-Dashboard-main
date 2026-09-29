"use client";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddPlayBook from "./AddPlayBook";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import { PlaybookItem } from "@/helpers/types";
import SectionLoader from "@/components/loaders/SectionLoader";
import { formatDate, hasClaim } from "@/lib/utils";
import DeletePlayBook from "./DeletePlayBook";
import Link from "next/link";
import BookCard from "./BookCard";

const BooksPage = () => {
  const [loading, setLoading] = useState(false);
  const { setToaster, selectedTeam, organization } = useApp();
  const [books, setBooks] = useState<PlaybookItem[] | null>(null);

  const getPlaybooks = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(`/api/Playbook/${selectedTeam?.id}`);
      //console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setBooks(data?.items);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRefetch = async () => {
    await getPlaybooks();
  };
  useEffect(() => {
    getPlaybooks();
  }, []);
  console.log(books);
  return (
    <div>
      <TopBar title="Plays Books" back={false}>
        {hasClaim(organization?.claims, "Permission.PlayBooks.Create") ? (
          <AddPlayBook handleRefetch={handleRefetch} />
        ) : (
          <></>
        )}
      </TopBar>
      {loading ? (
        <SectionLoader />
      ) : (
        <div className="px-4 py-12">
          <div className="flex items-start justify-start gap-2 flex-wrap">
            {books && books?.length > 0 ? (
              books.map((book) => {
                return (
                  <BookCard
                    book={book}
                    key={book?.id}
                    handleRefetch={handleRefetch}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
