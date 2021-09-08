import React from "react";
import { Tab } from "semantic-ui-react";
import InfoGame from "../InfoGame";

const TabsGame = (props) => {
  const { game, setReload } = props;

  const panes = [
    {
      menuItem: "Informacion",
      render: () => (
        <Tab.Pane>
          <InfoGame game={game} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="tabs-game" panes={panes}></Tab>;
};

export default TabsGame;
