import { NextResponse } from "next/server";

// Helper to decode JWT safely in Edge runtime
function base64UrlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = str.padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  return atob(padded);
}

function decodeJWT(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return payload;
  } catch (error) {
    console.error("❌ JWT decode error:", error);
    return null;
  }
}

function isTokenExpired(token) {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let isLoggedIn = false;
  let shouldRefreshToken = false;
  let userRole = null;

  if (accessToken) {
    if (!isTokenExpired(accessToken)) {
      const decoded = decodeJWT(accessToken);
      userRole = decoded?.role || null;
      isLoggedIn = true;
      console.log("✅ Access token valid", decoded);
    } else if (refreshToken && !isTokenExpired(refreshToken)) {
      const decoded = decodeJWT(refreshToken);
      userRole = decoded?.role || null;
      isLoggedIn = true;
      shouldRefreshToken = true;
      console.log("⚠️ Access token expired but refresh token valid", decoded);
    } else {
      console.log("❌ Both tokens expired");
    }
  }

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/admin",
    "/reports",
  ];
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  console.log("The is LoggedIn is ", isLoggedIn);

  // Protect routes
  if (isProtectedRoute && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("message", "Please login to access this page.");
    return NextResponse.redirect(url);
  }

  // 🚫 Restrict SUPERADMIN
  const restrictedForSuperAdmin = ["/reports", "/audits", "/merge"];
  if (userRole === "SUPERADMIN") {
    const isRestricted = restrictedForSuperAdmin.some((route) =>
      pathname.startsWith(route)
    );
    if (isRestricted) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      url.searchParams.set("error", "SUPERADMIN cannot access this page.");
      return NextResponse.redirect(url);
    }
  }

  // Prevent logged-in users from visiting login/register
  if (isPublicRoute && isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  // Flag if we should refresh token
  if (shouldRefreshToken) {
    response.headers.set("x-should-refresh-token", "true");
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/reports/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};

// import { NextResponse } from "next/server";

// function decodeJWT(token) {
//   try {
//     const parts = token.split(".");
//     if (parts.length !== 3) return null;
//     const payload = JSON.parse(atob(parts[1]));
//     return payload;
//   } catch (error) {
//     return null;
//   }
// }

// function isTokenExpired(token) {
//   const decoded = decodeJWT(token);
//   if (!decoded || !decoded.exp) return true;
//   const currentTime = Math.floor(Date.now() / 1000);
//   return decoded.exp < currentTime;
// }

// export async function middleware(request) {
//   const { pathname } = request.nextUrl;

//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   let isLoggedIn = false;
//   let shouldRefreshToken = false;
//   let userRole = null;

//   if (accessToken) {
//     if (!isTokenExpired(accessToken)) {
//       const decoded = decodeJWT(accessToken);
//       userRole = decoded?.role || null; // 👈 extract role
//       isLoggedIn = true;
//       console.log("✅ Access token valid");
//     } else if (refreshToken && !isTokenExpired(refreshToken)) {
//       const decoded = decodeJWT(refreshToken);
//       userRole = decoded?.role || null;
//       isLoggedIn = true;
//       shouldRefreshToken = true;
//       console.log("⚠️ Access token expired but refresh token valid");
//     } else {
//       console.log("❌ Both tokens expired");
//     }
//   }

//   // Define routes
//   const protectedRoutes = ["/dashboard", "/profile", "/settings", "/admin", "/reports"];
//   const publicRoutes = ["/login", "/register", "/forgot-password"];

//   const isProtectedRoute = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   // Protect routes
//   if (isProtectedRoute && !isLoggedIn) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/";
//     url.searchParams.set("message", "Please login to access this page.");
//     return NextResponse.redirect(url);
//   }

// // 🚫 Routes SUPERADMIN cannot access
// const restrictedForSuperAdmin = ["/reports", "/audits", "/merge"];

// // Restrict SUPERADMIN from these routes
// if (userRole === "SUPERADMIN") {
//   const isRestricted = restrictedForSuperAdmin.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isRestricted) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/dashboard"; // redirect somewhere safe
//     url.searchParams.set("error", "SUPERADMIN cannot access this page.");
//     return NextResponse.redirect(url);
//   }
// }

//   // Prevent logged-in users from visiting login/register
//   if (isPublicRoute && isLoggedIn) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   const response = NextResponse.next();

//   // Add refresh token flag if needed
//   if (shouldRefreshToken) {
//     response.headers.set("x-should-refresh-token", "true");
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     "/dashboard",
//     "/dashboard/:path*",
//     "/profile/:path*",
//     "/settings/:path*",
//     "/admin/:path*",
//     "/reports/:path*", // 👈 added reports to matcher
//     "/login",
//     "/register",
//     "/forgot-password",
//   ],
// };
