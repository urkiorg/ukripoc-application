export const daysLeft = (date: string | null) => {
    if (!date) {
        return false;
    }

    const closeDate = new Date(date);
    const closeDateTime = closeDate.getTime();
    const today = new Date();
    const timeToday = today.getTime();
    const timeleftBig = closeDateTime - timeToday;
    const timeLeft = Math.floor(timeleftBig / 1000 / 60 / 60);

    let timeToShow = timeLeft;
    let prefixToShow = "Hours";

    if (timeLeft > 24 && timeLeft < 48) {
        timeToShow = Math.floor(timeLeft / 24);
        prefixToShow = "Day left";
    } else if (timeLeft > 47) {
        timeToShow = Math.floor(timeLeft / 24);
        prefixToShow = "Days left";
    } else if (timeLeft === 1) {
        prefixToShow = "Hour left";
    } else if (timeLeft < 0) {
        timeToShow = 0;
        prefixToShow = "Ended";
    }

    return { timeToShow, prefixToShow };
};

export const friendlyDate = (date: string | null) => {
    return (
        date &&
        new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "long"
            } || ""
        )
    );
};
