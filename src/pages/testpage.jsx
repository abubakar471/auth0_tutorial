import useDrivePicker from 'react-google-drive-picker';
import { useEffect, useState } from 'react';
import { getGmailFromGoogleDrive } from '../apis/googleapifunc';

// Need to add URI in Authorized JavaScript origins to use client id.
const G_DRIVE_CLIENT_ID =
'26645870754-ub1s2lpq1084o0d4si3qlh8a2acfu1rs.apps.googleusercontent.com';

// Need to add Website restrictions in Set an application restriction to use API KEY.
const G_DRIVE_DEVELOPER_KEY = 'AIzaSyD_WwFAD1BJ6cD-NAKgOLdMjLSTYefhUiI';
const G_DRIVE_TOKEN = 'G_DRIVE_TOKEN';

const SCOPES = ['https://www.googleapis.com/auth/drive'];


function TestPage() {
  const [openPicker, authResponse] = useDrivePicker();

  useEffect(() => {
    if (authResponse && authResponse.access_token && authResponse.expires_in) {
      sessionStorage.setItem(G_DRIVE_TOKEN, authResponse.access_token);
    }
  }, [authResponse]);

  const getCustomViews = () => {
    if (!window.google || !window.google.picker) return;
    const customViews = [];
    const ggPicker = window.google.picker;

    const viewIds = ggPicker.ViewId.DOCS || [];
    // File View
    const fileView = new ggPicker.View(viewIds).setLabel('Drive Files');
    customViews.push(fileView);


    // Folder View
    const folderView = new ggPicker.DocsView();
    if (folderView) {
      folderView.setIncludeFolders(true)
      folderView.setMimeTypes('application/vnd.google-apps.folder')
      folderView.setSelectFolderEnabled(true)
      folderView.setLabel("Drive Folders");
      customViews.push(folderView);
    }

    const sharedwithmeview = new ggPicker.DocsView(viewIds);
    // Shared with me 
    if (sharedwithmeview) {
      sharedwithmeview.setOwnedByMe(false);
      customViews.push(sharedwithmeview);
    }


    // Shared Drives
    const shareddrivesview = new ggPicker.DocsView(viewIds);
    if (shareddrivesview) {
      shareddrivesview.setEnableDrives(true);
      shareddrivesview.setIncludeFolders(true);
      customViews.push(shareddrivesview);
    }  


    return customViews;
  };

  const handleOpenPicker = () => {
    const config = {
      clientId: G_DRIVE_CLIENT_ID,
      developerKey: G_DRIVE_DEVELOPER_KEY,
      viewId: 'DOCS',
      disableDefaultView: true,
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: true,
      setSelectFolderEnabled: true,
      customScopes: SCOPES,
      customViews: getCustomViews(),
      callbackFunction: (data) => {
        if (data.action === 'loaded') {
          console.info('Opened popup');
          return;
        } else if (data.action === 'cancel') {
          console.info('User clicked cancel/close button');
          return;
        }
        pickerCalllback(data);
      },
    };

    if (authResponse?.access_token || sessionStorage.getItem(G_DRIVE_TOKEN)) {
      config.token =
        authResponse?.access_token || sessionStorage.getItem(G_DRIVE_TOKEN);
    }
    openPicker(config);
  };

  const pickerCalllback = async (data) => {
    console.log('data: ', data, data.action, window.google.picker.Action.PICKED)
    const google = window.google
    let text = `Picker response: \n${JSON.stringify(data, null, 2)}\n`;
    const document = data[google.picker.Response.DOCUMENTS][0];
    const fileId = document[google.picker.Document.ID];
    console.log(fileId);
    console.log(document)
    console.log(document.mimeType);
    console.log(document.name);
    const newToken = sessionStorage.getItem(G_DRIVE_TOKEN)
    const useremail = await getGmailFromGoogleDrive(newToken, fileId)
    console.log('userEmail: ', useremail)
  };

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(G_DRIVE_TOKEN)      
    }
  }, [])

  return (
    <div className="App">
      <button onClick={handleOpenPicker} className="primary-button"> Open Google Picker</button>
    </div>
  );
}

export default TestPage;