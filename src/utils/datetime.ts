type FormattedDateAgo =
  | `${number} ${"minutes" | "hour" | "hours" | "days" | "weeks" | "months" | "years"} ago`
  | "just now"
  | "yesterday"
  | "last week"
  | "last month"
  | "last year";

export const dateDurationAgo = ({
  date,
  baseDate = new Date(),
}: {
  date: Date;
  baseDate?: Date;
}): FormattedDateAgo => {
  const diffInSeconds = Math.floor(
    (baseDate.getTime() - date.getTime()) / 1000,
  );

  if (diffInSeconds <= 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1 ? "yesterday" : `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? "last week" : `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? "last month" : `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return diffInYears === 1 ? "last year" : `${diffInYears} years ago`;
};
