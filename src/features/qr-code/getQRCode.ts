// import baseURL, { ENDPOINTS } from "../../shared/endpoints";

// interface IProps {
//   changeLoading: (prop: boolean) => void;
// }

// export default async function getQRCode({ changeLoading }: IProps) {
//   let imgSrc = "";

//   await fetch(`${baseURL}/${ENDPOINTS.ADMIN.QR_CODE}`, {
//     headers: {
//       "ngrok-skip-browser-warning": "69420",
//     },
//   })
//     // Retrieve its body as ReadableStream
//     .then((response) => {
//           changeLoading(true);
//       const reader = response.body!.getReader();
//       return new ReadableStream({
//         start(controller) {
//           return pump();
//           function pump() {
//             return reader.read().then(({ done, value }) => {
//               // When no more data needs to be consumed, close the stream
//               if (done) {
//                 controller.close();
//                 return;
//               }
//               // Enqueue the next data chunk into our target stream
//               controller.enqueue(value);
//               return pump();
//             });
//           }
//         },
//       });
//     })
//     // Create a new response out of the stream
//     .then((stream) => new Response(stream))
//     // Create an object URL for the response
//     .then((response) => response.blob())
//     .then((blob) => URL.createObjectURL(blob))
//     // Update image
//     .then((url) => {
//       imgSrc = url;
//     })
//     .catch((err) => console.error(err))
//     .finally(() => {
//           changeLoading(false);
//     });

//   return imgSrc;
// }

import baseURL, { ENDPOINTS } from "../../shared/endpoints";

interface IProps {
  changeLoading: (prop: boolean) => void;
}

export default async function getQRCode({ changeLoading }: IProps) {
  let imgSrc = "";

  try {
    changeLoading(true);
    const response = await fetch(`${baseURL}/${ENDPOINTS.ADMIN.QR_CODE}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    const reader = response.body!.getReader();
    const stream = new ReadableStream({
      start(controller) {
        return pump();
        function pump(): any {
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            return pump();
          });
        }
      },
    });

    const responseStream = new Response(stream);
    const blob = await responseStream.blob();
    const url = URL.createObjectURL(blob);
    imgSrc = url;
  } catch (err) {
    console.error(err);
  } finally {
    changeLoading(false);
  }

  return imgSrc;
}
