import React from "react";
import { Btn } from "./Btn";

const Info = ({
  head,
  title,
  paragraph,
  btn = "",
  btntrue = true,
  textstart = true,
  mb = "4",
  Width = "half",
  url = "",
}) => {
  const isArabic = /[\u0600-\u06FF]/.test(head || title || paragraph);

  return (
    <div
      className={`${Width === "half" ? "sm:w-1/2" : "sm:w-full"} w-[calc(100%-30px)] sm:w-1/2 px-0 my-20 sm:mb-0 sm:px-8 sm:my-10 ${isArabic ? "text-right" : textstart ? "text-start" : "text-center"
        }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <p
        className={`bg-primary-light mb-4 w-fit px-5 text-text-primary font-medium rounded-4xl h-8 lg:h-10 flex items-center justify-center text-[12px] lg:text-[16px] line-[150%] text-[#031C63]  ${isArabic
            ? textstart
              ? "me-auto"
              : "mx-auto"
            : textstart
              ? ""
              : "mx-auto"
          }`}
      >
        {head}
      </p>

      <div
        className={`flex gap-5 flex-col ${isArabic
            ? textstart
              ? "text-start"
              : "text-center"
            : textstart
              ? ""
              : "text-center"
          }`}
      >
        <h1
          className={`text-neutral-800 text-2xl lg:text-4xl font-bold leading-normal mb-3 md:mb-${mb} line-[150%]`}
        >
          {title}
        </h1>
        <p className="text-lg lg:text-2xl font-medium leading-normal mb-8 line-[150%]">
          {paragraph}
        </p>
      </div>

      {btntrue && (
        <div className={`${isArabic ? "ms-auto" : ""}`}>
          <Btn url={url} content={btn} />
        </div>
      )}
    </div>
  );
};

export default Info;
