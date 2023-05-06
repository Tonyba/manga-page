import { searchByTitle } from "@/utils/axios/filters";
import { ContentType } from "@/utils/types";
import React, { useEffect, useState } from "react";

const useSearchContent = (
  title: string
): [search: ContentType[], loading: boolean] => {
  const [search, setSearch] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await searchByTitle(title)
      .then((res) => res.data)
      .then((res) => {
        setLoading(false);
        setSearch(res.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (title.length < 2) return;

    setLoading(true);

    let searchTimer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [title]);

  return [search, loading];
};

export default useSearchContent;
