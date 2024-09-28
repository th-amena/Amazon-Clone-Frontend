import axios from "axios";

const axiosInstance = axios.create({
  //Local instance of Firebase functions
  //Can be used if deployed version fails  
  // baseURL: "http://127.0.0.1:5001/clone-2f73e/us-central1/api",

   //Deployed version of amazon server on render.com 
   baseURL: "https://amazon-api-deploy-tamena.onrender.com/",
});

export {axiosInstance}