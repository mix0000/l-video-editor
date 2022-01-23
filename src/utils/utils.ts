export function getFileExtension(path: string): string | undefined {
  const pathRegexp = /(?:\.([^.]+))?$/;

  return path.match(pathRegexp)?.[1];
}
