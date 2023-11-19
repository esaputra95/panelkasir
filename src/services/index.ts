import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'X-Custom-Header': 'foobar',
        'Content-Type': 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkOWUwYzgyLTdmM2YtNDllOS05YTdhLTdjOGViMDM3NjAxMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJuYW1lIjoiVWNoaWEiLCJpYXQiOjE2OTYzOTI0MjJ9.YKexgzhHh43RSMoLJDnAIroHW1aftkgG1z0JTNmgjHs"
    }
});