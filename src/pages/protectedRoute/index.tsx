import { useAppSelector } from "../../app/store/hooks";
import { Outlet, useNavigate } from "react-router";
import Post from "../../shared/enums/post";
import { useEffect, useState } from "react";
import React from "react";

interface IProps {
  onlyAdminRoutes?: boolean;
  onlyInspectorRoutes?: boolean;
  commonRoutes?: boolean;
}

export default function ProtectedRoute({
  onlyAdminRoutes,
  onlyInspectorRoutes,
  commonRoutes,
}: IProps) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
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

  if (onlyAdminRoutes) {
    return user?.post === Post.ADMIN ? <Outlet /> : <React.Fragment />;
  }
  if (onlyInspectorRoutes) {
    return user?.post === Post.INSPECTOR ? <Outlet /> : <React.Fragment />;
  }
  if (commonRoutes) {
    return user ? <Outlet /> : <React.Fragment />;
  }
}
