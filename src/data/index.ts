import { FaUserClock, FaPeopleCarry } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import {
  FaPeopleGroup,
  FaPersonHiking,
  FaPersonShelter,
  FaPersonWalking,
  FaUsersViewfinder,
} from "react-icons/fa6";
import { GiFaceToFace, GiBeamsAura } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { MdAdminPanelSettings, MdFamilyRestroom } from "react-icons/md";
import { PiShirtFoldedFill } from "react-icons/pi";
import { BsEmojiLaughingFill } from "react-icons/bs";

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
export const year = "2026";
export const email = "juanbarrios045@gmail.com";
export const enabledNewVote = Boolean(
  process.env.NEXT_PUBLIC_ENABLED_VOTES ?? false,
);

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
  "most-photogenic": FaCamera,
  "most-collaborator": FaPeopleCarry,
  "most-persistent": FaPersonHiking,
  "most-outstading": FaPeopleGroup,
  "most-new": FaPersonShelter,
  "most-serious": GiFaceToFace,
  "most-happy": BsEmojiLaughingFill,
  "most-style": PiShirtFoldedFill,
  "most-responsible": MdAdminPanelSettings,
  "most-assist": FaPersonWalking,
  "parents-young": MdFamilyRestroom,
  "most-influencer": FaUsersViewfinder,
  revelation: GiBeamsAura,
  "": IoPerson,
};
