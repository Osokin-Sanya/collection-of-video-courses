export function isTokenExpired(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { exp } = JSON.parse(jsonPayload);
  const expired = Date.now() >= exp * 1000;

  return expired;
}

export class Storage {
  static getJWT() {
    return localStorage.getItem("jwt");
  }
  static setJWT(value) {
    localStorage.setItem("jwt", value);
  }

  static getVideoProgress(lesson) {
    return localStorage.getItem("lesson_" + lesson);
  }
  static setVideoProgress(lesson, time) {
    localStorage.setItem("lesson_" + lesson, time);
  }
}
