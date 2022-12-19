export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// "sha256:xxxxxxxxxxxxxxxxxxxxxx" => "xxxxxxxxxxxx" (first 12 chars)
export const shortenSha256Hash = (hash: string) =>
  hash.split(":").at(-1)?.slice(0, 11);
