import { useState } from "react";
import Dog from "./images/dog.jpg";
import Gr from "./images/qr.png";

const Qr_generator = () => {
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("www.google.com");
  const [qrSize, setQrSize] = useState("150");
  async function generateQRCode() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (err) {
      console.error("Error generating QR code", err);
    } finally {
      setLoading(false);
    }
  }
  function downloadQRCode() {
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((err)=>{
      console.error("Error downloading QR code", err);
    })
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p className="loader">Please wait...</p>}
      {img && <img src={img} className="qr-code-image" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>

        <input
          type="text"
          id="dataInput"
          placeholder="Enter data for QR code"
          onChange={(e) => setQrData(e.target.value)}
        />

        <label htmlFor="dataInput" className="input-label">
          Image size (e.g., 150):
        </label>

        <input type="text" id="sizeinput" placeholder="Enter image size"  
        onChange={(e) => setQrSize(e.target.value)}
        />

        <button className="generate-button" disabled={loading} onClick={generateQRCode}>
          Generate QR Code{" "}
        </button>

        <button className="download-button" onClick={downloadQRCode}>
          Download QR code
        </button>
      </div>
    </div>
  );
};

export default Qr_generator;
