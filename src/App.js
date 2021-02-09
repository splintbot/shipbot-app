import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/pdfjs-express';
import './App.css';
import ExpressUtils from '@pdftron/pdfjs-express-utils'

const App = () => {
  const viewer = useRef(null);
  
//path that points to the pdf storage location. change to url to test 
  // if using a class, equivalent of componentDidMount 
WebViewer({
  disableFlattenedAnnotations: true,
  ...otherOptions
}).then(instance => {

  // Create a new instance of the utility SDKS
  const utils = new ExpressUtils();

  // Set a callback function for every time a document is loaded
  instance.docViewer.on('documentLoaded', async () => {
    // Get the loaded document's data
    const data = await instance.docViewer.getDocument().getFileData();
    // Set the file in the SDK
    utils.setFile(data);
    // Use the API to extract the XFDF
    const { xfdf } = await utils.extract();
    // Loading the resulting XFDF into the viewer
    const importedAnnotations = await Sinstance.annotManager.importAnnotations(xfdf);
  })
})
import FileSaver from 'file-saver'
import WebViewer from '@pdftron/pdfjs-exress'
import ExpressUtils from '@pdftron/pdfjs-express-utils'

WebViewer({
  disableFlattenedAnnotations: true,
  ...otherOptions
}).then(instance => {

  // Create a new instance of the utility SDK
  const utils = new ExpressUtils();

  // ... documentLoaded code from above

  // A function that gets called when the user clicks your download button.
  // This can be implemented any way you want.
  // In our example we will assume it is bounded to an '#download-button' button
  document.getElementById('download-button').onclick = () => {

    // Get the annotations and the documents data
    const xfdf = await instance.annotManager.exportAnnotations({});
    const fileData = await instance.docViewer.getDocument().getFileData({});

    // Set the annotations and document into the Utility SDK, then merge them together
    const resp = await utils
      .setFile(fileData)
      .setXFDF(xfdf)
      .merge();

    // Get the resulting blob from the merge operation
    const mergedBlob = await resp.getBlob();

    // trigger a download for the user!
    FileSaver.saveAs(mergedBlob, 'myfile.pdf')
  }
})
  return (
    <div className="App">
      <div className="header">Cloud Pdf</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
