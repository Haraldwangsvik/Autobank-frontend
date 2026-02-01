import React from "react";
import { BsSlack, BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

const Footer = () => {
  const footerLinks = [
    {
      name: "Slack",
      icon: <BsSlack size={24} />,
      link: "https://onlinentnu.slack.com/",
    },
    {
      name: "Facebook",
      icon: <BsFacebook size={24} />,
      link: "http://facebook.com/LinjeforeningenOnline",
    },
    {
      name: "Instagram",
      icon: <BsInstagram size={24} />,
      link: "https://www.instagram.com/online_ntnu/",
    },
    {
      name: "Github",
      icon: <BsGithub size={24} />,
      link: "https://github.com/appKom",
    },
  ];

  return (
    <footer className="bg-online-blue-800 border-t border-online-blue-700">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src={`${import.meta.env.BASE_URL}resources/logo/online-white.png`}
            className="h-8"
            alt="Online logo"
          />
          <span className="text-2xl font-semibold text-white">Bankom</span>
        </div>

        {/* Divider */}
        <div className="border-t border-online-blue-700 mb-8" />

        {/* Links */}
        <div className="flex justify-center mb-8">
          <a
            href="/faq"
            className="text-online-blue-200 hover:text-online-orange transition-colors font-medium"
          >
            FAQ
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <a
              href={link.link}
              key={link.name}
              target="_blank"
              rel="noopener noreferrer"
              className="text-online-blue-300 hover:text-online-orange transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="text-center text-online-blue-300 text-sm mb-6">
          <p className="mb-1">Feil pa siden?</p>
          <p>
            Ta kontakt med{" "}
            <a
              href="mailto:appkom@online.ntnu.no"
              className="text-online-orange hover:text-online-orange-300 transition-colors"
            >
              Appkom
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-online-blue-400 text-sm">
          Online Linjeforening {new Date().getFullYear()}. Alle rettigheter reservert.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
