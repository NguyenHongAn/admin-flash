import routers from "../config/routers";
import { useRouter } from "next/router";

function getRouterName() {
  const router = useRouter();
  for (let i = 0; i < routers.length; i++) {
    if (router.pathname === routers[i].path) return routers[i].name;
  }
}

export default getRouterName;
