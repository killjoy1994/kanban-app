import React from "react";
import LogoMobile from "../assets/logo-mobile.svg";
import DarkLogo from "../assets/logo-dark.svg";
import DownArrow from "../assets/icon-chevron-down.svg";
import UpArrow from "../assets/icon-chevron-up.svg";
import IconAdd from "../assets/icon-add-task-mobile.svg";
import IconDots from "../assets/icon-vertical-ellipsis.svg";

export default function Navbar() {
  return (
    <header className="flex">
      <div className="pt-8 pb-10 md:w-[300px] pl-8 md:border-r-2 md:border-b-2 shrink-0 md:border-r-slate-500 md:border-opacity-10">
        <img className="w-6 h-6 md:hidden" src={LogoMobile} alt="" />
        <div className="hidden md:block ">
          <img src={DarkLogo} alt="" />
        </div>
      </div>
      <nav className="flex md:pl-8 pr-8 justify-between items-center w-full md:border-b-2 md:border-r-slate-500 md:border-opacity-10">
        <div className="flex md:hidden">
          <button className="flex text-xl font-bold pl-6">Platform Launch</button>
          <span className="flex flex-col justify-center ml-2">
            <img src={DownArrow} alt="" />
          </span>
        </div>
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold">Platform Launch</h1>
        </div>
        <div className="flex items-center gap-x-4">
          <button className="md:hidden py-2 px-4 rounded-full bg-blue-violet">
            <img src={IconAdd} alt="" />
          </button>
          <button className="hidden py-2.5 px-5 rounded-full md:flex md:items-center gap-x-1 bg-blue-violet">
            <img className="h-2" src={IconAdd} alt="" />
            <span className="text-slate-50 font-bold">Add New Task </span>
          </button>
          <button>
            <img src={IconDots} alt="" />
          </button>
        </div>
      </nav>
    </header>
  );
}
