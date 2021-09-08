import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import HeaderGame from "../components/Game/HeaderGame";
import { getGameByIdAPI } from "../api/game";
import TabsGame from "../components/Game/TabsGame";
import Seo from "../components/Seo";

const Game = () => {
  const [reload, setReload] = useState(false);
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getGameByIdAPI(query.game);
      setGame(response[0]);
      setReload(false);
    })();
  }, [reload]);

  return (
    <BasicLayout className="game">
      <Seo title={game?.title} />
      <HeaderGame game={game} setReload={setReload} />
      <TabsGame game={game} setReload={setReload} />
    </BasicLayout>
  );
};

export default Game;
