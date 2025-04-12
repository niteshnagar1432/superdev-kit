// src/index.ts

import { init, checkAuth, getConfig } from "./src/auth";
import { MyAPI } from "./src/api/MyApi";
import { formatDate } from "./src/date/date";
import { getStatus } from "./src/status/getStatus";
import { convertVideoToThumb } from "./src/media/media_config"

export {
  init,
  checkAuth,
  getStatus,
  getConfig,
  MyAPI,
  formatDate,
  convertVideoToThumb,
};
