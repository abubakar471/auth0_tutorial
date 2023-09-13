const accessToken = 'ya29.a0AbVbY6OoNFsqt3uvDwSWf60gOsuLx4NvRemVm14d9ySqVuOo-DD23usF2pPnxM68ENQtS84Dk6bTNzrPruUTefeCZxmQjnKY2XCBoloaOX0eqiiFPYsGLAhLm5xRMtT9DcWolNpqkUs-tvMbl4Soyq36BSPvaCgYKAfcSARMSFQFWKvPlj8vREINnLUIHaKVYWG1n_Q0163';

const fileId = '1ZlkwkmPdfNQ7ElVJy-GhEkVlo_hAbjFY';
const fileId2 = '1UI8W6d1IGc1tHHjP_zgrobvCCuUWWwSt'

fetch(`https://www.googleapis.com/drive/v2/files/${fileId2}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(response => response.json())
  .then(data => {
    console.log(data); // This will log the file information.
    console.log("data.owners[0].emailAddress: ", data.owners[0].emailAddress)
    if(data) {
      return data.owners[0].emailAddress
    }
  })
  .catch(error => {
    console.error('Error fetching file information:', error);
  });