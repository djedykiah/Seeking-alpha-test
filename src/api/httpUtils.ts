const BASE_URL = 'http://seekingalpha.free.beeceptor.com';

export const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(
      `Network response was not ok - status  : ${response.status}`,
    );
  }

  return response.json();
};
