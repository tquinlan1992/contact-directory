const baseUrl = "http://localhost:8080";

export const getTestApi = async () => {
  const response = await fetch(`${baseUrl}/test`);
  console.log("response", response.body);
};
