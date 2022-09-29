import type { NextPage } from "next";
// import { useState } from 'react'

import { Typography } from "@mui/material";
import { signOut } from "next-auth/react";

import PdvButton from "@Uikit/PdvButton";
import PdvTabs from "@Uikit/PdvTabs";
import { useRouter } from "next/router";

import { routes } from "utils/routes";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>

      <PdvButton
        type="button"
        className="my-6 w-full"
        theme="teal-500"
        size="large"
        onClick={() => router.push("/16237")}
      >
        Ver Form
      </PdvButton>
    </div>
  );
};

export default Home;
