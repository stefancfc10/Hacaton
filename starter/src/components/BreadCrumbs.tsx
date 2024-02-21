import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {
  home: string;
  type: string;
  category: string;
  name: string;
}

const Breadcrumbs = ({ home, type, category, name }: Props) => {
  const router = useRouter();
  return (
    <div className="col-12 pt-3 choose-category">
      <Link href={"/"} className="text-dark mr-1">
        <span>{home} &gt; </span>
      </Link>
      <span
        onClick={() => {
          router.push({
            pathname: "/productsPage",
            query: {
              type: type.toLowerCase(),
            },
          });
        }}
        className="mr-1"
      >
        {type} &gt;
      </span>

      <span
        onClick={() => {
          router.push({
            pathname: "/productsPage",
            query: {
              type: type.toLowerCase(),
              category: category.toLowerCase(),
            },
          });
        }}
        className="mr-1 "
      >
        {category} &gt;
      </span>
      <span className="mr-1">{name}</span>
    </div>
  );
};

export default Breadcrumbs;
