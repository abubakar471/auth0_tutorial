import useDrivePicker from "react-google-drive-picker";
import { useEffect, useState } from "react";
import { getGmailFromGoogleDrive } from "../apis/googleapifunc";

import Chat from "../components/Chat";
import MobileSiderbar from "../components/MobileSidebar";
import RightPanel from "../components/RightPanel";
import Sidebar from "../components/Sidebar";
import { serverAuthAPI } from "../apis/backendapi";
import { Helmet } from "react-helmet";

const G_DRIVE_CLIENT_ID =
  "135600683384-kd5hev0ik63e0toudupfajtllhphgdu4.apps.googleusercontent.com";
const G_DRIVE_DEVELOPER_KEY = "AIzaSyBLuLgOv54zhvT0QXTnDRCnywWfpAQc5Bc";

const G_DRIVE_TOKEN = "G_DRIVE_TOKEN";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const OAUTH_REDIRECT_LINK =
  "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://kai-chatwithdoc.netlify.app/&prompt=consent&response_type=code&client_id=135600683384-kd5hev0ik63e0toudupfajtllhphgdu4.apps.googleusercontent.com&scope=openid+https://www.googleapis.com/auth/drive+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/drive.file+https://www.googleapis.com/auth/drive.metadata+https://www.googleapis.com/auth/drive.metadata.readonly+https://www.googleapis.com/auth/drive.photos.readonly+https://www.googleapis.com/auth/drive.readonly&access_type=offline";

export default function HomePage() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [userFileInfo, setUserFileInfo] = useState(null);
  const [response0, setResponse0] = useState([]);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const updateResponse0 = (data) => {
    setResponse0(data);
  };

  const [openPicker, authResponse] = useDrivePicker();
  const [accessToken, setAccessToken] = useState("");

  const [googleAuthURL, setGoogleAuthURL] = useState("");

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        setGoogleAuthURL(window.location);
        const respAuth = await serverAuthAPI(window.location);
        if (respAuth.error) {
          // alert('google login failed')
          return;
        }
        setAccessToken(respAuth.data);
      }
    })();
  }, []);

  useEffect(() => {
    if (accessToken) {
      handleOpenPicker();
    }
  }, [accessToken]);

  const getCustomViews = () => {
    if (!window.google || !window.google.picker) return;
    const customViews = [];
    const ggPicker = window.google.picker;

    const viewIds = ggPicker.ViewId.DOCS || [];
    // File View
    const fileView = new ggPicker.View(viewIds).setLabel("Drive Files");
    customViews.push(fileView);

    // Folder View
    const folderView = new ggPicker.DocsView();
    if (folderView) {
      folderView.setIncludeFolders(true);
      folderView.setMimeTypes("application/vnd.google-apps.folder");
      folderView.setSelectFolderEnabled(true);
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

  const handleOpenPicker = async () => {
    if (!accessToken) {
      window.location.href = OAUTH_REDIRECT_LINK;
      return;
    }

    const config = {
      clientId: G_DRIVE_CLIENT_ID,
      developerKey: G_DRIVE_DEVELOPER_KEY,
      viewId: "DOCS",
      disableDefaultView: true,
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: true,
      setSelectFolderEnabled: true,
      customScopes: SCOPES,
      customViews: getCustomViews(),
    };

    if (accessToken || sessionStorage.getItem(G_DRIVE_TOKEN)) {
      config.token = accessToken || sessionStorage.getItem(G_DRIVE_TOKEN);
    }

    if (config.token) {
      function myCallback(data) {
        if (data.action === "loaded") {
          console.info("Opened popup");
          return;
        } else if (data.action === "cancel") {
          console.info("User clicked cancel/close button");
          return;
        }
        pickerCalllback(data, config.token);
      }
      config.callbackFunction = myCallback;
      openPicker(config);
    }
  };

  const pickerCalllback = async (data, config_token) => {
    // console.log('data: ', data, data.action, window.google.picker.Action.PICKED)
    const google = window.google;
    let text = `Picker response: \n${JSON.stringify(data, null, 2)}\n`;
    const document = data[google.picker.Response.DOCUMENTS][0];
    const fileId = document[google.picker.Document.ID];
    console.log("data: ", data);
    // console.log(fileId);
    // console.log(document)
    // console.log(document.mimeType);
    // console.log(document.name);
    const email_id = await getGmailFromGoogleDrive(config_token, fileId);
    console.log("userEmail: ", email_id);
    setUserFileInfo({
      email_id: email_id,
      token: config_token,
      fileId: fileId,
      file_name: document.name,
      file_type: document.mimeType,
    });
  };

  useEffect(() => {
    if (userFileInfo) {
      console.log("UserFileInfo: ", userFileInfo);
    }
    return () => {
      sessionStorage.removeItem(G_DRIVE_TOKEN);
    };
  }, [userFileInfo]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | KAI Venture Partners</title>
      </Helmet>

      <main className="overflow-hidden w-full h-screen relative flex">
        {isComponentVisible ? (
          <MobileSiderbar
            toggleComponentVisibility={toggleComponentVisibility}
          />
        ) : null}
        <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
          <div className="flex h-full min-h-0 flex-col ">
            <Sidebar handleGoogleLogin={handleOpenPicker} />
          </div>
        </div>
        <Chat
          toggleComponentVisibility={toggleComponentVisibility}
          userFileInfo={userFileInfo}
          response0={response0}
          updateResponse0={updateResponse0}
        />
        <RightPanel response0={response0} />
      </main>
    </>
  );
}
