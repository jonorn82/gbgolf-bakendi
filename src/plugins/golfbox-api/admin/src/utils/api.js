import golfboxInstance from "./axiosInstance";

export const getTournaments = () => golfboxInstance.get('/getTournaments');
export const getClasses = (tournamentId) => golfboxInstance.get(`/getClasses/${tournamentId}`);
export const getLeaderboard = (classId, tournamentId) => golfboxInstance.get(`/getLeaderboard/${classId}/${tournamentId}`);
export const getInfo = (tournamentId) => golfboxInstance.get(`/getInfo/${tournamentId}`);