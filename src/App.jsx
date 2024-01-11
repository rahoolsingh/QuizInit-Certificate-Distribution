import { useState } from "react";
import logo from "./assets/logo.png";

function App() {
  const [found, setFound] = useState(false);
  const [email, setEmail] = useState("");
  const [sbuCode, setSbuCode] = useState("");
  const [certificateImage, setCertificateImage] = useState(null);
  const [error, setError] = useState(null);
  const [partialEmail, setPartialEmail] = useState(null);

  const handleEmailField = (e) => {
    setEmail(e.target.value);
  };

  const handleSbuCodeField = (e) => {
    setSbuCode(e.target.value);
  };

  const fetchCertificateImage = async () => {
    try {
      // Make an AJAX request to the backend endpoint
      setPartialEmail(null)
      setError(null)
      const url = `http://localhost:3000/getCertificateImage?email=${email}&sbu_code=${sbuCode}`;
      const response = await fetch(url);

      if (response.status === 404) {
        const data = await response.json();
        if (data.partialEmail) {
          setPartialEmail(data.partialEmail);
        }
        throw new Error(response.status+' : '+response.statusText);
      }

      const blob = await response.blob();
      setCertificateImage(URL.createObjectURL(blob));
      setFound(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  const downloadImage = () => {
    if (certificateImage) {
      const link = document.createElement("a");
      link.href = certificateImage;
      link.download = "QuizInit_certificate.png";
      link.click();
    }
  };

  return (
    <div className="min-h-screen w-full dark:bg-zinc-700 dark:text-white">
      <div className="w-full dark:bg-purple-800 dark:text-white flex items-center justify-between p-4">
        <div className="inline-flex items-center space-x-3">
          <img className="w-14 rounded-lg mix-blend-lighten" src={logo} />
          <span className="font-bold text-3xl">ezVerify Pilot</span>
        </div>
        <div className="flex gap-3 items-center">
          <p className="font-semibold hidden">Follow Me:</p>
          <a
            className="fa-brands fa-github"
            href="https://github.com/rahoolsingh"
            target="_blank"
            rel="noreferrer"
          ></a>
          <a
            className="fa-brands fa-linkedin"
            href="https://linkedin.com/in/rahoolsingh"
            target="_blank"
            rel="noreferrer"
          ></a>
          <a
            className="fa-brands fa-x-twitter"
            href="https://x.com/rahoolsingh_inc"
            target="_blank"
            rel="noreferrer"
          ></a>
        </div>
      </div>

      {!found && (
        <div id="form" className="w-[80%] m-auto">
          <h2 className="text-3xl pt-5 font-semibold">
            QuizInit Certificate <span className="text-sm">(2022)</span>
          </h2>
          <p className="text-lg lg:text-left text-left py-5 font-semibold">
            Please enter the details below to fetch your certificate.
          </p>
          <div className="lg:flex lg:gap-5 w-full">
            <div className="flex flex-col lg:w-4/6">
              <label htmlFor="email">Email:</label>
              <input
                className="text-black p-2 rounded-lg"
                type="email"
                id="email"
                value={email}
                placeholder="example@email.com"
                onChange={handleEmailField}
              />
            </div>
            <div className="flex flex-col lg:w-2/6">
              <label htmlFor="sbuCode">SBU Registration Number:</label>
              <input
                className="text-black p-2 rounded-lg"
                type="text"
                id="sbuCode"
                value={sbuCode}
                placeholder="SBU220000"
                onChange={handleSbuCodeField}
              />
            </div>
          </div>
          <div className="text-center">
            <button
              className="dark:bg-purple-800 dark:text-white text-black bg-white p-2 rounded-lg my-5 mx-auto"
              onClick={fetchCertificateImage}
            >
              Fetch Certificate
            </button>
          </div>
          {partialEmail && <div className="text-center text-white bg-red-600 w-fit m-auto px-4 py-1 rounded-lg text-lg">Please enter your email: {partialEmail}</div>}
        </div>
      )}

      {found && (
        <div
          id="result"
          className="rounded-lg overflow-hidden w-[80%] m-auto py-8 lg:flex gap-10 items-center"
        >
          {certificateImage && (
            <>
              <img
                id="certificateImage"
                className="rounded-lg lg:w-7/12"
                src={certificateImage}
                alt="Certificate"
              />
              <div className="lg:w-5/12 leading-1">
                <p className="font-bold text-2xl py-3 hidden lg:block">
                  Congratulations Participant
                </p>
                <p className="font-semibold text-2xl py-3">
                  Download this certificate
                </p>
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-1">
                  <button
                    className="dark:bg-green-800 dark:text-white text-black bg-white p-2 rounded-lg"
                    onClick={downloadImage}
                  >
                    <i className="fa-solid fa-download"></i> Download
                    Certificate
                  </button>
                </div>
                <div className="pt-20">
                  <p className="text-lg pt-3 font-semibold">
                    Powered by SecureWonders.com
                  </p>
                  <p className="pb-5">
                    In case of any mistake or support please contact us on
                    WhatsApp
                  </p>
                  <a
                    className="dark:bg-red-700 dark:text-white text-black bg-white p-2 rounded-lg my-5 mx-auto hover:cursor-pointer"
                    href="https://wa.me/917673841437?text=Hi%20Secure%20Wonders,%0AApp%20Code:%20SBU_QUIZINIT_2022%0A"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Report Issue
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="pt-20 text-center">
          <div>{error.message}</div>
          <p className="pb-5">
            In case of any mistake or support please contact us on WhatsApp
          </p>
          <a
            className="dark:bg-red-700 dark:text-white text-black bg-white p-2 rounded-lg my-5 mx-auto hover:cursor-pointer"
            href="https://wa.me/917673841437?text=Hi%20Secure%20Wonders,%0AApp%20Code:%20SBU_QUIZINIT_2022%0A"
            target="_blank"
            rel="noreferrer"
          >
            Report Issue
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
