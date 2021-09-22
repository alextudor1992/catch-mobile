
export const formatDate = (date: Date | null = null) => {
  return (date ? date : new Date()).toUTCString();
}
