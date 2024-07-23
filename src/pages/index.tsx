import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./error";
import LoaderElement from "../shared/ui/loaderElement";
import ProtectedRoute from "./protectedRoute";
import SocialWorkers from "./socialWorkers";

export default function Routing() {
  const Auth = lazy(() => import("./auth"));
  const Profile = lazy(() => import("./profile"));
  const Inspectors = lazy(() => import("./inspectors"));
  const Regions = lazy(() => import("./regions"));
  const QR_Code = lazy(() => import("./qr-code"));
  const Clients = lazy(() => import("./clients"));
  const AssignedSocialWorker = lazy(() => import("./assignedSocialWorker"));
  const Nurse = lazy(() => import("./nurse"));
  const Favours = lazy(() => import("./favours"));
  const AdminReport = lazy(() => import("./adminReport"));
  const InspectorReport = lazy(() => import("./inspectorReport"));
  const SocialWorkerReport = lazy(() => import("./socialWorkerReport"));

  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} errorElement={<ErrorPage />} />
      <Route
        path="/auth"
        element={
          <Suspense fallback={<LoaderElement />}>
            <Auth />
          </Suspense>
        }
        errorElement={<ErrorPage />}
      />

      <Route element={<ProtectedRoute commonRoutes />}>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Profile />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>

      <Route element={<ProtectedRoute onlyAdminRoutes />}>
        <Route
          path="/inspectors"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Inspectors />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/regions"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Regions />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/admin-report"
          element={
            <Suspense fallback={<LoaderElement />}>
              <AdminReport />
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
        <Route
          path="/qr-code"
          element={
            <Suspense fallback={<LoaderElement />}>
              <QR_Code />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/clients"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Clients />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/assigned-social-worker"
          element={
            <Suspense fallback={<LoaderElement />}>
              <AssignedSocialWorker />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/nurse"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Nurse />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/favours"
          element={
            <Suspense fallback={<LoaderElement />}>
              <Favours />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/inspector-report"
          element={
            <Suspense fallback={<LoaderElement />}>
              <InspectorReport />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/social-worker-report/:id"
          element={
            <Suspense fallback={<LoaderElement />}>
              <SocialWorkerReport />
            </Suspense>
          }
          errorElement={<ErrorPage />}
        />
      </Route>
    </Routes>
  );
}
