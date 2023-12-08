import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./error";
import LoaderElement from "../shared/ui/loaderElement";
import ProtectedRoute from "./protectedRoute";

export default function Routing() {
  const Auth = lazy(() => import("./auth"));
  const SocialWorkers = lazy(() => import("./social-workers"));
  const QR_Code = lazy(() => import("./qr-code"));
  const Profile = lazy(() => import("./profile"));
  const Staff = lazy(() => import("./staff"));

  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} errorElement={<ErrorPage />} />
      <Route element={<ProtectedRoute authRoutes />}>
        <Route
          path="/auth"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Auth />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>

      <Route element={<ProtectedRoute commonRoutes />}>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/qr-code"
          element={
            <Suspense fallback={<LoaderElement />}>
              <QR_Code />
            </Suspense>
          }
        />
      </Route>

      <Route element={<ProtectedRoute onlyAdminRoutes />}>
        <Route
          path="/staff"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Staff />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>

      <Route element={<ProtectedRoute onlyInspectorRoutes />}>
        <Route
          path="/social-workers"
          element={
            <Suspense fallback={<LoaderElement />}>
              <SocialWorkers />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>
        <Route
          path="/social-workers"
          element={
            <Suspense fallback={<LoaderElement />}>
              <SocialWorkers />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>
    </Routes>
  );
}

// eve.holt@reqres.in
// cityslicka
