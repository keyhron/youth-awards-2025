import { pageName, year } from "@/data";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 text-[10px] sm:text-sm">
      <div className="flex container justify-end px-4 mx-auto gap-5">
        <p>
          {pageName} {year}, ¡Te esperamos!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
