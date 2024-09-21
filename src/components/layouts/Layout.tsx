import { ReactNode } from "react";
import { strings } from "../../utils/strings";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <header className="h-20 flex justify-center items-center bg-primary-300 text-white font-bold text-2xl px-4">
        {strings.HEADER_TEXT}
      </header>
      <main className="flex-1 bg-primary-50 p-4 sm:p-8">{children}</main>
      <footer className="h-10 bg-primary-300"></footer>
    </div>
  );
};

export default Layout;
