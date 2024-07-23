const baseURL = import.meta.env.VITE_SERVER_URL;

export const ENDPOINTS = {
  AUTH: {
    SIGNIN: "web/auth/signin",
    USER: "web/workers/user-token",
    REFRESH_TOKEN: "web/auth/refresh",
    PERSONAL_INFO: "web/workers/change-personal-info",
    PASSWORD: "web/workers/change-password",
  },
  INSPECTOR: {
    SOCIAL_WORKERS: "web/workers/social-workers",
    SOCIAL_WORKERS_BY_REGION_ID: "web/workers/social-workers-by-region",
    SOCIAL_WORKERS_ASSIGNED_TO_CLIENT: "web/workers/get-pinned-socworkers",
    CLIENT: "mobile/clients",
    CLIENTS: "web/workers/clients",
    CLIENTS_BY_REGION_ID: "mobile/clients/web",
    ASSIGN_SOCIAL_WORKER: "web/workers/assign-socialworker",
    DETACH_SOCIAL_WORKER: "web/workers/detach-socialworker",
    NURSE: "nurse-service",
    CATEGORIES: "mobile/favors/categories",
    FAVORS: "mobile/favors",

    SOCIAL_WORKER: "",
    INSPECTOR_REPORT: "reports/get-monthly-inspector-report",
    SOCIAL_WORKER_REPORT: "reports/get-monthly-socialworker-report",
  },
  ADMIN: {
    INSPECTORS: "web/workers/inspectors",
    REGIONS: "web/region",
    QR_CODE: "qr-code.gif",
    CODE: "web/workers/generate-code",
    REPORT: "reports/get-monthly-admin-report",
  },
};

export default baseURL;
