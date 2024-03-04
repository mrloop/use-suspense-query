const startTime = new Date().getTime();

export default function secondsSinceStart() {
  return ((new Date().getTime() - startTime) / 1000).toFixed();
}
