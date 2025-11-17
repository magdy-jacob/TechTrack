import React from "react";
import Info from "../../../components/ui/Info";
import Circles from "./Circles";
import { useTranslation } from "react-i18next";

const Tracks = () => {
  const { t } = useTranslation();
  const head = t("Tracks.head");
  const title = t("Tracks.title");
  const paragraph = t("Tracks.paragraph");
  const btn = t("Tracks.btn");

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-16 items-center justify-center container mx-auto  mb-10 ">
      <Circles />
      <Info
        head={head}
        title={title}
        paragraph={paragraph}
        btn={btn}
        Width="full"
      />
    </div>
  );
};

export default Tracks;
