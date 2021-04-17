import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Auth() {
  const router = useRouter();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt === null) {
      router.push("/login", undefined, { shallow: true });
    } else {
      router.push("/general-statistic", undefined, { shallow: true });
    }
  }, []);

  return <></>;
}
export default Auth;
