// src/index.ts

import { init, checkAuth, getConfig } from "./src/auth";
import { MyAPI } from "./src/api/MyApi";
import { formatDate } from "./src/date/date";
import { getStatus } from "./src/status/getStatus";

export {
  init,
  checkAuth,
  getStatus,
  getConfig,
  MyAPI,
  formatDate,
};
