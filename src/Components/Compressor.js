import React, {useState} from 'react';

/*Javascript module to be run in the web browser for image compression.*/
import imageCompression from "browser-image-compression";

/*Including css file*/
import './Compressor.css'

/*Importing Upload and Download Image Icon*/
import Download from '../Images/Download.png';
import Upload from '../Images/Upload.png';

/*Importing NavBar Component to create a Beautiful Navbar and Card Component from Bootstrap */
import {Navbar, Card} from "react-bootstrap";

/*Import the Font Awesome Icons that are used in this file*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'


//This function will be exported to App.js
function Compressor(){
  const [compressedLink, setCompressedLink ] = useState("");
  const [originalImage, setOriginalImage ] = useState("");
  const [originalLink, setOriginalLink ] = useState("");
  const [clicked, setClicked ] = useState(false);
  const [uploadImage, setUploadImage ] = useState(false);
  const [outputFileName, setOutputFileName ] = useState("");
  const [providedSize, setProvidedSize] = useState(50);
  const [afterSize, setAfterSize] = useState();

  //It will handle upload part of image
  const handleSizeChange = (e) => {
    setProvidedSize(e.target.value);
  };
  const handleDownload = (e) => {
    setTimeout(() => {
      window.location.reload();
  }, 5000);
  };
  function uploadLink(event){
    //To get the image file which user had uploaded in the input field
    const imageFile = event.target.files[0];
    // Create a DOMString containing a URL that represents the imageFile
    setOriginalLink(URL.createObjectURL(imageFile));
    //Now set the original image link, name of output file and upload image state
    setOriginalImage(imageFile);
    setOutputFileName("compressed"+providedSize+"kB"+originalImage.name);
    setUploadImage(true);
  }

  //This will be called when user clicks on Compress Button
  function click(e){
    e.preventDefault();
    setOutputFileName("compressed"+providedSize+"kB"+originalImage.name);
    const options = {
      maxSizeMB: (providedSize)/1024,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };

    if (originalImage.size / 1024  <= providedSize) {
      alert("Size of uploaded Image is already less than provided compression size.");
      return 0;
    }

    //this code will compress the original image
    let output;
    imageCompression(originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      setAfterSize(output.size);
      setCompressedLink(downloadLink);
    });

    setClicked(true);
    return 1;
  };

  return(
    <div className="mainContainer">
      <Navbar className="navbar justify-content-center" bg="light" variant="light">
        <Navbar.Brand className="navbar-content" href="/">
          <FontAwesomeIcon className="social-icons changeOn" icon={faImage} size={1} />{' '}
          Compress Image In kB
        </Navbar.Brand>
      </Navbar>

        <div className='mt-5'>
          <h2>Four Simple Steps</h2>
          <p>1. Upload Image</p>
          <p>2. Provide the size in kB for compression</p>
          <p>3. Click On Compress Button</p>
          <p>4. Download Compressed Image</p>
        </div>

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {uploadImage ? (
              <>
              <Card.Img
                className="image"
                variant="top"
                src={originalLink}
              ></Card.Img>
              <p>(Before compression size is { (originalImage.size / 1024).toFixed(2) } kB)</p>
              </>
            ) : (
              <Card.Img
                className="uploadCard"
                variant="top"
                src={Upload}
              ></Card.Img>
            )}
            <div className="d-flex justify-content-center upload-btn-wrapper">
            <button class="btn btn-dark">Upload A Image</button>
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={event => uploadLink(event)}
              />
            </div>
          </div>

          <hr/>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-4 col-sm-12 d-flex flex-column justify-content-center align-items-center">
            <br />
            {outputFileName ? (
              <>

                <h4>Please enter the size in kB</h4>
                <input 
                  onChange={handleSizeChange} 
                  placeholder={providedSize} 
                  type='number' 
                  name='confirmPassword' 
                  value={providedSize} 
                  required 
                />
                
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={e => click(e)}
                >
                  Compress
                </button>
              </>
            ) : (
              <></>
            )}

          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img className="image" variant="top" src={compressedLink}></Card.Img>
            
            {compressedLink ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p>(After compression size is { (afterSize / 1024).toFixed(2) } kB)</p>
                <a
                  href={compressedLink}
                  download={outputFileName}
                  className="mt-2 btn btn-dark w-75"
                  onClick={handleDownload}
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <p className='mt-3 mb-5'>Developed by <span style={{color: "#0be7d1"}}>Sachin Saini</span></p>
      </div>
  )
}

export default Compressor;
