import React from "react";
import IconDarkTheme from "../../assets/icon-dark-theme.svg";
import IconLightTheme from "../../assets/icon-light-theme.svg";
import IconHideSidebar from "../../assets/icon-hide-sidebar.svg";
import { useDispatch } from "react-redux";
import { setShowSidebar } from "../../redux/boardSlice";

export default function ButtonToggle() {
  const dispatch = useDispatch();
  return (
    <div className="pl-8">
      <div className="flex w-[90%] items-center bg-cyan-100 bg-opacity-20 h-10 justify-center gap-x-5 mb-6">
        <img className="w-5 h-5" src={IconDarkTheme} alt="" />
        <input type="checkbox" className="toggle" defaultChecked />
        <img className="w-5 h-5" src={IconLightTheme} alt="" />
      </div>
      <button onClick={() => dispatch(setShowSidebar(false))} className="flex items-center gap-3">
        <img src={IconHideSidebar} alt="" />
        <span className="text-slate-500 font-bold">Hide Sidebar</span>
      </button>
    </div>
  );
}
