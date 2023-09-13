import GooglePicker from "react-google-picker";
import { FaGoogle } from "react-icons/fa";
export default function TestPage3() {
  const CLIENT_ID = '26645870754-ub1s2lpq1084o0d4si3qlh8a2acfu1rs.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyD_WwFAD1BJ6cD-NAKgOLdMjLSTYefhUiI';
  const APP_ID = 'j3BD2566ii98WMyr8QUXQHgE7VI7r4J7';
  const scope = [
    "https://www.googleapis.com/auth/drive.readonly",
  ];

  const onAuthFail = (err) => {
    console.log('err: ', err)
  }
  return (
    <div className="App">
      <GooglePicker
        clientId={CLIENT_ID}
        developerKey={API_KEY}
        scope={scope}
        onAuthFailed={onAuthFail}
        navHidden
        mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
        createPicker={(google, oauthToken) => {
          const picker = new google.picker.PickerBuilder()
            .addView(new google.picker.View(google.picker.ViewId.DOCS_IMAGES))
            .addView(new google.picker.DocsUploadView())
            .setOAuthToken(oauthToken)
            .setDeveloperKey(API_KEY)
            .setAppId(APP_ID)
            .setCallback((data) => {
              if (data.action === google.picker.Action.PICKED) {
                var fileId = data.docs[0].id;
                alert("The user selected: " + fileId);
              }
            })
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED);

          picker.build().setVisible(true);
        }}
      >
        <button>
          <FaGoogle color="red" /> Continue with google
        </button>
      </GooglePicker>
    </div>
  );
}
