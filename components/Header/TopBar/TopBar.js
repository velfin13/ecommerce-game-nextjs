import React, { useEffect, useState } from "react";
import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

const TopBar = () => {
  /* extrayendo Colum de Grid */
  const { Column } = Grid;

  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Column width={8} className="top-bar__left">
            <Logo />
          </Column>
          <Column width={8} className="top-bar__right">
            <Search />
          </Column>
        </Grid>
      </Container>
    </div>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="logo" />
      </a>
    </Link>
  );
};

const Search = () => {
  const [searchStr, setSearchStr] = useState("");
  const [load, setLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (load) {
      router.push(`/search?query=${searchStr}`);
    }
    setLoad(true);
  }, [searchStr]);

  return (
    <Input
      id="search-game"
      icon={{ name: "search" }}
      value={router.query.query}
      onChange={(_, data) => setSearchStr(data.value)}
    />
  );
};

export default TopBar;
