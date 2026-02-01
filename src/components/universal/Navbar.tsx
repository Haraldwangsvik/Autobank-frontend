import React, { useEffect, useState } from "react";

import LogOutIcon from "../../icons/LogOutIcon";
import Button from "./Button";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { logoutUser } from "../../utils/userutils";
import { checkUserResponse } from "../../pages/Authcallback";
import useAutobankStore from "../../store/autobankstore";
import { useAuth } from "react-oidc-context";
import "../../styles/navbar.css";

type NavdropdownProps = {
  user?: checkUserResponse | null;
  name: string | undefined;
  logout: () => void;
  login: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const routes = [
  { name: "Kvittering", path: `${import.meta.env.BASE_URL}kvittering` },
  { name: "Min side", path: `${import.meta.env.BASE_URL}minside` },
];

const NavDropdown = (props: NavdropdownProps) => {
  return (
    <div
      className={`lg:hidden absolute top-14 right-0 z-10 w-56 py-2 mt-2 text-base border border-online-blue-600 rounded-lg shadow-xl ${
        props.isAuthenticated ? "bg-online-blue-700" : "bg-white"
      }`}
    >
      {props.isAuthenticated ? (
        <div className="text-white">
          <div className="px-4 py-3 border-b border-online-blue-600">
            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}resources/logo/online-logo-white.png`}
                className="h-5"
                alt="Online logo"
              />
              <p className="font-medium truncate">{props.name}</p>
            </div>
          </div>

          <div className="py-2">
            {props.isAdmin && (
              <a
                href="/admin"
                className="block px-4 py-2 hover:bg-online-blue-600 transition-colors"
              >
                Admin
              </a>
            )}
            {routes.map((route) => (
              <a
                href={route.path}
                key={route.name}
                className="block px-4 py-2 hover:bg-online-blue-600 transition-colors"
              >
                {route.name}
              </a>
            ))}
          </div>

          <div className="border-t border-online-blue-600 pt-2">
            <button
              onClick={() => props.logout()}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-online-blue-600 transition-colors"
            >
              <span>Logg ut</span>
              <LogOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => props.login()}
          className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 transition-colors text-online-blue"
        >
          <img
            src="resources/logo/online-logo-blue.png"
            className="h-5"
            alt="Online logo"
          />
          <span className="font-medium">Logg inn</span>
        </button>
      )}
    </div>
  );
};

const Navbar = () => {
  const [showNavDropdown, setShowNavDropdown] = useState<Boolean>(false);

  const { userInfo, setUserInfo } = useAutobankStore();

  const toggleNavbarDropdown = () => {
    setShowNavDropdown(!showNavDropdown);
  };

  const { signinRedirect, removeUser, user, isAuthenticated } = useAuth();

  const isAdmin = (): boolean => {
    return userInfo != null && userInfo.isadmin;
  };

  const logout = () => {
    setUserInfo(null);
    removeUser();
  };

  const location = window.location.pathname;

  return (
    <div className="relative">
      <nav className="bg-online-blue h-16 border-b border-online-blue-600">
        <div className="flex items-center justify-between px-4 h-full w-full fixed z-50 bg-online-blue border-b border-online-blue-600">
          {/* Logo */}
          <a className="flex items-center gap-3" href="/">
            <img
              src={`${import.meta.env.BASE_URL}resources/logo/online-logo-white.png`}
              className="h-10 w-auto"
              alt="Online logo"
            />
            <span className="text-xl font-semibold text-white tracking-tight">
              Autobank
            </span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={toggleNavbarDropdown}
            className="lg:hidden p-2 rounded-lg hover:bg-online-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            <Bars3Icon
              className={`text-white h-6 w-6 transition-all duration-200 ${
                showNavDropdown ? "rotate-45 opacity-0 absolute" : "rotate-0 opacity-100"
              }`}
            />
            <XMarkIcon
              className={`text-white h-6 w-6 transition-all duration-200 ${
                showNavDropdown ? "rotate-0 opacity-100" : "rotate-45 opacity-0 absolute"
              }`}
            />
          </button>

          {showNavDropdown && (
            <NavDropdown
              user={userInfo}
              logout={logout}
              login={signinRedirect}
              name={user?.profile.name}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin()}
            />
          )}

          {/* Desktop navigation */}
          {isAuthenticated ? (
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-1">
                {userInfo?.isadmin && (
                  <a
                    className={`relative text-white px-4 py-2 rounded-lg hover:bg-online-blue-600 transition-colors font-medium ${
                      location === `${import.meta.env.BASE_URL}admin` ? "active-link" : ""
                    }`}
                    href="/admin"
                  >
                    Admin
                  </a>
                )}
                {routes.map((route) => (
                  <a
                    className={`relative text-white px-4 py-2 rounded-lg hover:bg-online-blue-600 transition-colors font-medium ${
                      location === route.path ? "active-link" : ""
                    }`}
                    href={route.path}
                    key={route.name}
                  >
                    {route.name}
                  </a>
                ))}
              </div>

              <Button
                title="Logg ut"
                color="white"
                size="small"
                icon={<LogOutIcon className="w-4 h-4" />}
                onClick={() => logout()}
              />

              <div className="flex items-center gap-2 bg-white text-online-blue px-4 py-2 rounded-lg font-medium">
                <img
                  src={`${import.meta.env.BASE_URL}resources/logo/online-logo-blue.png`}
                  className="h-5"
                  alt="Online logo"
                />
                <span className="max-w-[150px] truncate">{user?.profile.name}</span>
              </div>
            </div>
          ) : (
            <div className="hidden lg:block">
              <button
                onClick={() => signinRedirect()}
                className="flex items-center gap-2 bg-white text-online-blue px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <img
                  src="resources/logo/online-logo-blue.png"
                  className="h-5"
                  alt="Online logo"
                />
                <span>Logg inn</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
