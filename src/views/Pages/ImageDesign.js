import React from  'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import intial from '../../assets/img/bg.jpg'
const myTheme = {
    // Theme object to extends default dark theme.
  };
  
  const ImageDesign = () => (
    <ImageEditor
    
      includeUI={{
        loadImage: {
          path: intial,
          name: 'SampleImage'
        },
        theme: myTheme,
        menu: ['shape', 'filter', 'crop', 'text'],
        initMenu: 'filter',
        uiSize: {
          width: '100%',
          height: '650px'
        },
        menuBarPosition: "right",
      }}
      cssMaxHeight={500}
      // cssMaxWidth={450}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70
      }}
      usageStatistics={false}
      
    />
  );

  export default ImageDesign;