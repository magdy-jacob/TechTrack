import React from "react";
import Info from "../../../components/ui/Info";
import AnimationCard from "./AnimationCard";
import { useTranslation } from "react-i18next";

const Opportunity = () => {
  const { t } = useTranslation();

  const head = t("opportunity.head");
  const title = t("opportunity.title");
  const paragraph = t("opportunity.paragraph");
  const btn = t("opportunity.btn");

  return (
    <div className=" flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 items-center justify-center container mx-auto mt-10 sm:mt-32 mb-10">
      <Info head={head} title={title} paragraph={paragraph} btn={btn} />
      <AnimationCard />
    </div>
  );
};

export default Opportunity;
