import { isTokenExpired, Storage } from "../utils";

const BASE_API = "https://api.wisey.app/api/v1";

const endpoints = {
  auth: `${BASE_API}/auth/anonymous?platform=subscriptions`,
  courses: `${BASE_API}/core/preview-courses`,
  courseById: (courseId) => `${BASE_API}/core/preview-courses/${courseId}`,
};

async function updateJWT() {
  try {
    const response = await fetch(endpoints.auth);

    if (!response.ok) throw new Error("Failed to fetch auth token");

    const { token } = (await response.json()) || {};

    Storage.setJWT(token);

    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getJWT() {
  const jwt = Storage.getJWT();

  if (!jwt || isTokenExpired(jwt)) {
    return await updateJWT();
  }

  return jwt;
}

export async function fetchCourses() {
  try {
    const jwt = await getJWT();

    const response = await fetch(endpoints.courses, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!response.ok) throw new Error("Failed to fetch courses");

    const data = await response.json();

    return [data, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
}

export async function fetchCourse(courseId) {
  try {
    const jwt = await getJWT();

    const response = await fetch(endpoints.courseById(courseId), {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!response.ok) throw new Error(`Failed to fetch ${courseId} course`);

    const data = await response.json();

    return [data, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
}
