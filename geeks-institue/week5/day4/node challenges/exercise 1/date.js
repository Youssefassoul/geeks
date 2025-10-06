function timeUntilJan1st() {
  const now = new Date();
  const nextYear =
    now.getMonth() === 0 && now.getDate() === 1
      ? now.getFullYear() + 1
      : now.getFullYear() + 1;
  const jan1st = new Date(`${nextYear}-01-01T00:00:00`);
  const diffMs = jan1st - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return `The 1st January is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

// Export the function
module.exports = timeUntilJan1st;
