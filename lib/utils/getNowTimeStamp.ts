export function getNowTimeStamp() {
  return Date.now ? Date.now() : new Date().getTime();
}
