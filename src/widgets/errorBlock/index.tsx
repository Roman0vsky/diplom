import { useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../../app/store/hooks";
import Post from "../../shared/enums/post";
import React, { useEffect, useState } from "react";

export default function ErrorBlock() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  if (location.pathname === "/" && user === null) {
    navigate("/auth");
  }

  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);

    isLoaded &&
      (user?.post === Post.INSPECTOR
        ? navigate("/social-workers")
        : user?.post === Post.ADMIN
        ? navigate("/inspectors")
        : navigate("/auth"));
  }, [user, isLoaded]);

  return <React.Fragment />;
}
