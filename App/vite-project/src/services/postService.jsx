import axios from "axios";
import { useAuth } from "../context/AuthContextProvider";

class Post {
  create(formData) {
    const url = "http://localhost:8000/api/create-post";
    return axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  getPosts(id) {
    const url = `http://localhost:8000/api/get-posts/${id}`;
    console.log(id)
    return axios.get(url);
  }

  deletePost(id) {
    const url = `http://localhost:8000/api/delete-post/${id}`;
    return axios.get(url);
  }

  updatePost(formData) {
    const url = "http://localhost:8000/api/update-post";

    return axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        // Reload the page after a successful update
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
}

export default new Post();
