import baseURL, { ENDPOINTS } from "../../shared/endpoints";

export default async function getQRCode(isLoading: boolean) {
  let imgSrc = "";

  await fetch(`${baseURL}/${ENDPOINTS.QR_CODE}`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  })
    // Retrieve its body as ReadableStream
    .then((response) => {
      isLoading = true;
      const reader = response.body!.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    // Create a new response out of the stream
    .then((stream) => new Response(stream))
    // Create an object URL for the response
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    // Update image
    .then((url) => {
      imgSrc = url;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      isLoading = false;
    });

  return imgSrc;
}
