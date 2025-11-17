import React from "react";
import { Linkedin, Github, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";
export default function Footer() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("footer.explore.title"),
      links: [
        { label: t("footer.explore.links.home"), url: "/" },
        { label: t("footer.explore.links.roadmaps"), url: "/roadmap" },
        { label: t("footer.explore.links.companies"), url: "/companies" },
      ],
    },
    {
      title: t("footer.techtrack.title"),
      links: [
        { label: t("footer.techtrack.links.about"), url: "#" },
        { label: t("footer.techtrack.links.contact"), url: "#" },
      ],
    },
    {
      title: t("footer.legal.title"),
      links: [
        { label: t("footer.legal.links.privacy"), url: "#" },
        { label: t("footer.legal.links.terms"), url: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[var(--color-primary-light)] pt-12 w-full text-[--text-color]">
      <div className="container mx-auto flex flex-wrap justify-between gap-8 md:gap-12 lg:gap-16 px-8 max-w-7xl">
        {/* 👣 Left Section */}
        <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
          <a href="/" className="flex items-center gap-2 mb-6">
            <img
              src="assets/image/logo2.png"
              alt="Logo"
              className="w-10 h-12"
            />
            <span className="text-[var(--color-secondary)] text-2xl font-bold">
              TechTrack
            </span>
          </a>
          <p className="text-sm leading-7 mb-6 text-[var(--color-text)] max-w-xs">
            {t("footer.description")}
          </p>

          {/* 🌐 Social icons */}
          <div className="flex gap-3">
            {[Linkedin, Github, Twitter].map((Icon, index) => (
              <a
                key={`icon-${index}`}
                href="#"
                className="w-9 h-9 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-transform hover:scale-110"
              >
                <Icon className="text-[var(--color-white)] w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* 🧩 باقي الأعمدة */}
        {columns.map((col, i) => (
          <ul
            key={`col-${i}`}
            className="w-[calc(50%-20px)] sm:w-1/3 md:w-auto list-none mb-8 md:mb-0"
          >
            <li className="font-bold text-[var(--secondary-color)] mb-5 text-base">
              {col.title}
            </li>
            {col.links.map((link, idx) => (
              <li key={`link-${i}-${idx}`} className="mb-4">
                <Link

                  to={link.url} // ✅ استخدم to بدل href
                  className="text-sm hover:text-[var(--color-primary)] text-[var(--color-text)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* © Rights */}
      <div className="mx-auto bg-[var(--color-primary)] text-white flex justify-center py-2 mt-16">
        <p className="mb-0 text-center">
          © 2025 TechTrack
          <span className="font-black text-2xl mx-0.5"> | </span>
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
