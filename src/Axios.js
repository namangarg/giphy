import axios from "axios";

const axiUrl = axios.create({
  baseURL: "http://www.api.giphy.com/v1/",
  params: {
    api_key: "PxvudBW4agRnP6hYnRz0wHxk9PmsMh8w"
  }
});

export default axiUrl;