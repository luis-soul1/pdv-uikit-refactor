import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import Header from "layouts/Header";
import Navbar from "layouts/Navbar";

type TLayout = {
  children: JSX.Element;
};

const Layout: React.FC<TLayout> = (props) => {
  const { status } = useSession();
  const router = useRouter();

  if (router.pathname === "/uikit") return props.children;

  if (status === "authenticated")
    return (
      <>
        <Header />
        <div className="container relative flex gap-10">
          <div className="w-full overflow-auto py-14 pr-10">
            {props.children}
          </div>
        </div>
      </>
    );

  return props.children;
};

export default Layout;
