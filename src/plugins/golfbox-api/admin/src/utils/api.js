import golfboxInstance from "./axiosInstance";

export const getTournaments = () => golfboxInstance.get('/getTournaments');
export const getClasses = (tournamentId) => golfboxInstance.get(`/getClasses/${tournamentId}`);
export const getLeaderboard = (classId, tId) => golfboxInstance.get(`/getLeaderboard/${classId}/${tId}`);
