//Running on production vs dev mode
export const URLrequests = process.env.NODE_ENV === "production" ? "http://petadoptions101.com" : "http://localhost:5050"