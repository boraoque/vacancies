
/**
 *
 * We will use this composable to use dates helpers
 */
export function useDate() {

    /**
     * 
     * @param date 
     */
    function formatDate(date) {
        return date?.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    /**
 * 
 * @param date1 
 * @param date2 
 */
    function areDatesSame(firstdate, seconddate) {
        const date1 = new Date(firstdate);
        const date2 = new Date(seconddate);
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }


    /**
     *
     */
    return {
        formatDate, areDatesSame
    };
}
