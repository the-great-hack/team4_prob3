import axios from "axios";
import history from "@history";
import FuseUtils from "@fuse/FuseUtils";
import config from "app/config";


class jwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();
    if (!access_token) {
      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = data => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.baseURL}/api/v1/auth/signup`, data)
        .then(response => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            redirect(response.data.user.role);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        })
        .catch(err => {
          const error = {
            email: "User name or email already exist",
            displayName: "User name or email already exist"
          };
          reject(error);
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise( (resolve, reject) => {

      axios
        .post(`${config.baseURL}/api/v1/auth/login`, {
          email: email,
          password: password
        })
        .then(response => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            redirect(response.data.user.role);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        })
        .catch(err => {
          const error = {
            email: "Check your username",
            password: "Check your password"
          };
          reject(error);
        });
    });
  };

  signInWithToken = () => {
    return new Promise(async (resolve, reject) => {
      axios
        .post(`${config.baseURL}/api/v1/user/access-token`, {
          accessToken: this.getAccessToken()
        })
        .then(response => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            redirect(response.data.user.role);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        })
        .catch(err => {
          const error = "Invalid access token detected";
          reject(error);
        });
    });
  };

  updateUserData = user => {
    return axios.post("/api/auth/user/update", {
      user: user
    });
  };

  setSession = access_token => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = access_token => {
    if (!access_token) {
      return false;
    }
    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const redirect = role => {
  role === "admin"
    ? history.push({
        pathname: "/admin/dashboard"
      })
    : history.push({
        pathname: "/dashboard"
      });
};

const instance = new jwtService();

export default instance;
