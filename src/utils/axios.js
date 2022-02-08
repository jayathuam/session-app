import axios from "axios";

import { omdbApiKey, omdbUrl } from "../config";

export default axios.create({
  baseURL: omdbUrl,
  params: {
    apikey: omdbApiKey,
  },
});
