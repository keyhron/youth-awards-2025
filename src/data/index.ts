import { FaUserClock, FaPeopleCarry } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import {
  FaPeopleGroup,
  FaPersonHiking,
  FaPersonShelter,
  FaPersonWalking,
} from "react-icons/fa6";
import { GiFaceToFace } from "react-icons/gi";
import { TbMoodHappy } from "react-icons/tb";
import { RiShirtLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { MdAdminPanelSettings, MdFamilyRestroom } from "react-icons/md";

export const navbarOptions = [
  {
    href: "/",
    name: "Inicio",
  },
  {
    href: "/nominados",
    name: "Nominados",
  },
  {
    href: "/votos",
    name: "Votos",
  },
];

export const pageName = "Premios Juventud";
export const year = "2025";
export const email = "juanbarrios045@gmail.com";
export const enabledNewVote = process.env.NEXT_PUBLIC_ENABLED_VOTES;

export const footerOptions = [
  {
    href: "/privacy",
    name: "Privacy",
  },
  {
    href: "/terms",
    name: "Terms",
  },
];

export const CATEGORY_ICONS = {
  "most-punctual": FaUserClock,
  "most-photogenic": FiCamera,
  "most-collaborator": FaPeopleCarry,
  "most-persistent": FaPersonHiking,
  "most-outstading": FaPeopleGroup,
  "most-new": FaPersonShelter,
  "most-serious": GiFaceToFace,
  "most-happy": TbMoodHappy,
  "most-style": RiShirtLine,
  "most-responsible": MdAdminPanelSettings,
  "most-assist": FaPersonWalking,
  "parents-young": MdFamilyRestroom,
  "": IoPerson,
};
