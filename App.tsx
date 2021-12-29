/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

 import React from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
 } from 'react-native';
 
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 
 import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers/media-provider';
 import { ProviderFactory } from '@atlaskit/editor-common';
 
 import Renderer from './packages/renderer/mobile-renderer-element';
 import { MentionProvider } from '@atlaskit/mention/types';
 import {
   createCardClient,
   createEmojiProvider,
   createMentionProvider,
 } from './packages/providers';
 import { useFetchProxy } from './packages/utils/fetch-proxy';
 import getBridge from './packages/renderer/native-to-web/bridge-initialiser';
 import useRendererConfiguration from './packages/renderer/hooks/use-renderer-configuration';
 
 
 // @ts-ignore
 window.logBridge = window.logBridge || [];
 
 const initialDocument = JSON.stringify({
   version: 1,
   type: 'doc',
   content: [
     {
       type: 'paragraph',
       content: [
         {
           type: 'text',
           text: 'This is the mobile renderer',
         },
       ],
     },
   ],
 });

 const providerFactory = ProviderFactory.create({
  mentionProvider: Promise.resolve({} as MentionProvider),
});
 
 const App = () => {
  const fetchProxy = useFetchProxy();
  // const rendererBridge = getBridge();
  // const rendererConfiguration = useRendererConfiguration(rendererBridge);

   return (
     <View 
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
       <Text>Hello, world!</Text>
       <Renderer
        // cardClient={createCardClient()}
        emojiProvider={createEmojiProvider(fetchProxy)}
        mentionProvider={createMentionProvider()}
        document={initialDocument}
        mediaProvider={storyMediaProviderFactory({
          collectionName: 'InitialCollectionForTesting',
          includeUserAuthProvider: false,
        })}
        dataProviders={providerFactory}
        allowHeadingAnchorLinks
        locale="en"
        // rendererBridge={rendererBridge}
      />
     </View>
   )
 }
 
 
 
 export default App;
 