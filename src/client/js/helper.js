/**
 * Calculate the length (in days) between two dates.
 * @param startDay
 * @param endDay
 * @returns {number}
 */
function calculateLength(startDay, endDay) {
   // from https://stackoverflow.com/a/3224854/13272177
   const diffTime = Math.abs(new Date(endDay) - new Date(startDay));
   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

module.exports = {
   calculateLength
};