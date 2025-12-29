// Configuration and utility exports moved from App.js

export const frontendConfig = {
  pages: {
    home: "/",
    dashboard: "/dashboard",
    auth: "/auth",
  },
  api: {
    signup: "/api/auth/signup",
    signin: "/api/auth/signin",
    logout: "/api/auth/logout",
    verifyToken: "/api/auth/verify",
  },
  storage: {
    tokenKey: "token",
    userKey: "user",
  },
};

export const backendConfig = {
  database: {
    type: "mongodb",
    connectionString: process.env.MONGODB_URI || "",
    poolSize: 10,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "",
    tokenExpiry: "7d",
    hashRounds: 10,
  },
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    credentials: true,
  },
};

class AppState {
  constructor() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    this.loading = false;
    this.error = null;
  }
  initializeFromStorage() {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem(frontendConfig.storage.tokenKey);
      const storedUser = localStorage.getItem(frontendConfig.storage.userKey);
      if (storedToken) {
        this.token = storedToken;
        this.isAuthenticated = true;
      }
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
  }
  saveToStorage() {
    if (typeof window !== "undefined") {
      if (this.token) {
        localStorage.setItem(frontendConfig.storage.tokenKey, this.token);
      }
      if (this.user) {
        localStorage.setItem(frontendConfig.storage.userKey, JSON.stringify(this.user));
      }
    }
  }
  clearAuth() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    if (typeof window !== "undefined") {
      localStorage.removeItem(frontendConfig.storage.tokenKey);
      localStorage.removeItem(frontendConfig.storage.userKey);
    }
  }
  setUser(user, token) {
    this.user = user;
    this.token = token;
    this.isAuthenticated = !!token;
    this.saveToStorage();
  }
}

export const appState = new AppState();

export async function verifyToken(token) {
  try {
    const response = await fetch(frontendConfig.api.verifyToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("[v0] Token verification failed:", error);
    return false;
  }
}

export async function handleSignup(userData) {
  appState.loading = true;
  appState.error = null;
  try {
    const response = await fetch(frontendConfig.api.signup, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }
    return { success: true, data };
  } catch (error) {
    appState.error = error.message;
    console.error("[v0] Signup error:", error);
    return { success: false, error: error.message };
  } finally {
    appState.loading = false;
  }
}

export async function handleSignin(credentials) {
  appState.loading = true;
  appState.error = null;
  try {
    const response = await fetch(frontendConfig.api.signin, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Sign in failed");
    }
    appState.setUser(data.user, data.token);
    return { success: true, data };
  } catch (error) {
    appState.error = error.message;
    console.error("[v0] Sign in error:", error);
    return { success: false, error: error.message };
  } finally {
    appState.loading = false;
  }
}

export async function handleLogout() {
  try {
    await fetch(frontendConfig.api.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appState.token}`,
      },
    });
  } catch (error) {
    console.error("[v0] Logout error:", error);
  } finally {
    appState.clearAuth();
  }
}

export function isUserAuthenticated() {
  return appState.isAuthenticated && appState.token !== null;
}

export function getCurrentUser() {
  return appState.user;
}

export function getAuthToken() {
  return appState.token;
}

export async function initializeApp() {
  console.log("[v0] Initializing application...");
  appState.initializeFromStorage();
  if (appState.token) {
    const isValid = await verifyToken(appState.token);
    if (!isValid) {
      console.log("[v0] Token invalid, clearing authentication");
      appState.clearAuth();
    }
  }
  console.log("[v0] Application initialized");
}
