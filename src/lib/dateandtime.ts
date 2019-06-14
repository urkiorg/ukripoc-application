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

    let time = timeLeft;
    let suffix = "Hours";

    if (timeLeft > 24 && timeLeft < 48) {
        time = Math.floor(timeLeft / 24);
        suffix = "Day left";
    } else if (timeLeft > 47) {
        time = Math.floor(timeLeft / 24);
        suffix = "Days left";
    } else if (timeLeft === 1) {
        suffix = "Hour left";
    } else if (timeLeft < 0) {
        time = 0;
        suffix = "Ended";
    }

    return { time, suffix };
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
