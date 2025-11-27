import cookie from "cookie";
import { auth } from "~/auth";

const cookiePrefix = process.env.NEXONAUTS_COOKIE_PREFIX || "nexonauts";
const sessionCookieName =
  process.env.NODE_ENV === "development"
    ? `${cookiePrefix}.session_token`
    : `__Secure-${cookiePrefix}.session_token`;

const getSessionFromRequest = async (req) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionToken = cookies[sessionCookieName];
  
  if (!sessionToken) {
    return null;
  }
  
  try {
    const session = await auth.api.getSession({
      headers: new Headers({
        cookie: req.headers.cookie || "",
      }),
    });
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

// CHECKING FUNCTIONS
export const hasToken = async (req) => {
  const session = await getSessionFromRequest(req);
  return session !== null;
};

export const isAdmin = async (req) => {
  const session = await getSessionFromRequest(req);
  if (!session || session.user.role !== "admin") {
    return false;
  }
  return true;
};
export const getUser = async (req) => {
  const session = await getSessionFromRequest(req);
  if (!session || !session.user) {
    return null;
  }
  return session.user;
};


// API MIDDLEWARE
export const hasTokenMiddleware = async (req, res, next) => {
  const session = await getSessionFromRequest(req);

  if (!session) {
    return next(new Error("Not Allowed - Not logged in"));
  }
  next();
};

export const isAdminMiddleware = async (req, res, next) => {
  const session = await getSessionFromRequest(req);

  if (!session) {
    return next(
      new Error({
        code: 401,
        message: "Not Allowed - Not logged in",
        success: false,
      })
    );
  }

  if (session.user.role !== "admin") {
    return next(
      new Error({
        code: 401,
        message: "Not Allowed - Not admin",
        success: false,
      })
    );
  }
  next();
};
export const hasSsrMiddleware = async (req, res, next) => {
  return new Promise(function (resolve, reject) {
    console.log(req.headers);
    const authHeader = req.headers["x-authorization"];

    if (!authHeader) {
      // If no authorization header is present, the request is not authenticated
      return reject({
        code: 401,
        message: "Missing authorization header",
        success: false,
      });
    }

    // The authorization header should have the format: "Bearer <token>"
    const [authType, token] = authHeader.split(" ");

    if (
      authType !== "Bearer" ||
      !token ||
      token !== process.env.NEXT_AUTH_SECRET
    ) {
      // If the authorization header format is incorrect, the request is not authenticated
      return res.status(401).json({
        code: 401,
        message: "Invalid authorization header",
        success: false,
      });
    } else if (token === process.env.NEXT_AUTH_SECRET) {
      resolve({
        code: 200,
        message: "Valid authorization header",
        success: true,
      });
    } else {
      reject({
        code: 401,
        message: "Invalid authorization header",
        success: false,
      });
    }
  });
};
