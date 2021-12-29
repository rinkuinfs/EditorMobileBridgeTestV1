//export const getQueryParams = () => new URLSearchParams(window.location.search);

//import 'react-native-url-polyfill/auto';

// export const getQueryParams = () => new URLSearchParams({"mode": "light", "allowCollabProvider": "true", "enableLightDarkTheming": "true", "enableLegacyMobileMacros": "true", "allowCaptions": "false", "selectionObserverEnabled": "true", "enableMediaResize": "false"});

// export const getModeValue = (): 'dark' | 'light' => {
//   const params = getQueryParams();
//   const input: unknown = params.get('mode');
//   switch (input) {
//     case 'dark':
//     case 'light':
//       return input;
//     case null:
//       return 'light';
//     default:
//       throw new Error(
//         `Could not determine mode for input ${JSON.stringify(input)}`,
//       );
//   }
// };

// export const getAllowCollabProvider = (): boolean =>
//   getQueryParams().get('allowCollabProvider') === 'true';

// export const getEnableLightDarkTheming = (): boolean =>
//   getQueryParams().get('enableLightDarkTheming') === 'true';

// export const getEnableLegacyMobileMacros = (): boolean =>
//   getQueryParams().get('enableLegacyMobileMacros') === 'true';

// export const getAllowCaptions = (): boolean => {
//   return getQueryParams().get('allowCaptions') === 'true';
// };

// export const getSelectionObserverEnabled = (): boolean =>
//   getQueryParams().get('selectionObserverEnabled') === 'true';

// export const getMediaImageResize = (): boolean => {
//   return getQueryParams().get('enableMediaResize') === 'true';
// };


export const getModeValue = (): 'dark' | 'light' => {
  return "light";
};

export const getAllowCollabProvider = (): boolean =>
  true;

export const getEnableLightDarkTheming = (): boolean =>
  true;

export const getEnableLegacyMobileMacros = (): boolean =>
  false;

export const getAllowCaptions = (): boolean => {
  return false;
};

export const getSelectionObserverEnabled = (): boolean =>
  true;

export const getMediaImageResize = (): boolean => {
  return false;
};