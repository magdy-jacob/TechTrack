import { Link } from "react-router-dom";

export const Btn = ({ url = "", content, arrow = true, Px = "6" }) => {
  return (
    <Link
      to={`/${url}`}
      className={`bg-primary hover:bg-secondary duration-300 px-${Px} py-2.5 flex w-fit gap-4 justify-center items-center rounded-3xl text-white`}
    >
      {content}
      {arrow ? (
        <img
          src="/assets/image/arrow-up-right.png"
          alt="arrow icon"
          className="w-5 h-5 "
        />
      ) : (
        ""
      )}
    </Link>
  );
};
