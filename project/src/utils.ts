export const getFormattedRating = (rating: number): string => {
  if (rating > 0 && rating < 3) {
    return 'Bad';
  }

  if (rating >= 3 && rating < 5) {
    return 'Normal';
  }

  if (rating >= 5 && rating < 8) {
    return 'Good';
  }

  if (rating >= 8 && rating < 10) {
    return 'Good';
  }

  if (rating === 10) {
    return 'Awesome';
  }

  return 'Incorrect';
};

export const getTimeFromMins = (mins: number): string => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;

  return `${hours}h ${minutes}m`;
};

export const getTimeFromSecs = (secs: number): string => {
  const TIME_LENGTH = 2;
  const hours = Math.floor(secs / 3600);
  const hs = secs % 3600;
  const minutes = Math.floor(hs / 60);
  const seconds = hs % 60;

  const displayedHours = `${hours}`.padStart(TIME_LENGTH, '0');
  const displayedMinutes = `${minutes}`.padStart(TIME_LENGTH, '0');
  const displayedSeconds = `${seconds}`.padStart(TIME_LENGTH, '0');

  if (hours === 0) {
    return `${displayedMinutes} : ${displayedSeconds}`;
  }

  return `${displayedHours} : ${displayedMinutes} : ${displayedSeconds}`;
};

export const getFormattedDate = (date: string): string => {
  const formattedDate = new Date(date).toLocaleString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
};
