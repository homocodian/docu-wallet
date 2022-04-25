export default function getFileExt(fileUri: string) {
  if (fileUri) {
    const ext = fileUri.split("/").pop()?.split(".").pop();
    return ext || "jpg";
  } else {
    return "jpg";
  }
}
