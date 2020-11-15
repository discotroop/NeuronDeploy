// https://www.npmjs.com/package/axios

import axios from "axios";

const apiPort = process.env.PORT || 8000;

console.log(apiPort + "/api");
// base URL to where API is running
const api = axios.create({
  // localhost for development
  baseURL: "/api"
});

// Calls to newsletter
const addNewsletter = payload => api.post(`/newsletter`, payload);
const getAllNewsletters = () => api.get(`/newsletters`);
const updateNewsletterById = (id, payload) =>
  api.put(`/newsletter/${id}`, payload);
const deleteNewsletterById = id => api.delete(`/newsletter/${id}`);
const getNewsletterById = id => api.get(`/newsletter/${id}`);
const getNewsletterByURL = newsletter_URL =>
  api.get(`/newsname/${newsletter_URL}`);

// Calls to edition
const addEdition = payload => api.post(`/edition`, payload);
const getAllEditions = () => api.get(`/editions`);
const updateEditionById = (id, payload) => api.put(`/edition/${id}`, payload);
const deleteEditionById = id => api.delete(`/edition/${id}`);
const getEditionById = id => api.get(`/edition/${id}`);
const getEditionByURL = edition_URL => api.get(`/edname/${edition_URL}`);

// Calls to articles
const addArticle = payload => api.post(`/article`, payload);
const getAllArticles = () => api.get(`/articles`);
const updateArticleById = (id, payload) => api.put(`/article/${id}`, payload);
const deleteArticleById = id => api.delete(`/article/${id}`);
const getArticleById = id => api.get(`/article/${id}`);

// Using fetch() in timeSelector now but should switch to this
// CALL TO UNIQUE ARTICLE URLS DO NOT CHANGE THIS WITHOUT GOOD REASON
// IF you CHANGE IT GO TO: root/API/routes/apiRouter and make sure the adjustments match there.
const getArticle = ArticleURl => api.get(`/select/${ArticleURl}`);
const getArticleShort = Article_Short_URL =>
  api.get(`/name/${Article_Short_URL}`);

// Calls to Users
const addUser = payload => api.post(`/user`, payload);
const getAllUsers = () => api.get(`/users`);
const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
const deleteUserById = id => api.delete(`/user/${id}`);
const getUserByEmail = email => api.get(`/user/${email}`);
const checkUserByEmail = email => api.get(`/user/check/${email}`);

// Calls to logins and sessions
const loginUser = payload => api.post("/login", payload);
const logoutUser = payload => api.post("/logout", payload);
const verify = payload => api.get("/verify", payload);

const apiCalls = {
  // newsletter
  addNewsletter,
  getAllNewsletters,
  updateNewsletterById,
  deleteNewsletterById,
  getNewsletterById,
  getNewsletterByURL,
  // edition
  addEdition,
  getAllEditions,
  updateEditionById,
  deleteEditionById,
  getEditionById,
  getEditionByURL,
  // article
  addArticle,
  getAllArticles,
  updateArticleById,
  deleteArticleById,
  getArticleById,
  // get article
  getArticle,
  getArticleShort,
  // users
  addUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserByEmail,
  checkUserByEmail,
  // logins+sessions
  loginUser,
  logoutUser,
  verify
};

export default apiCalls;
