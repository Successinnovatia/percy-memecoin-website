import { useState } from "react";
import { ethers } from "ethers";
import { FaXTwitter } from "react-icons/fa6";
import { PiTelegramLogoLight } from "react-icons/pi";
import { IoCopyOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"

const contractAddress = "3PxdRYbgdhXWeLKFUSD8PNGwzkzhEcGnfeKvgFJTpump";

function App() {
  const [account, setAccount] = useState(null);
  const [copied, setCopied] = useState(false);
  const [dropdown, setDropdown] = useState(false);


  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts");
      setAccount(accounts[0]);
      const signer = await  provider.getSigner();
    } catch (error) {
      console.log("Error connecting to wallet: ", error);
    }
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <main className="bg-[#F0F0F0] min-h-svh">
      <header className="relative flex justify-between w-full md:w-5/6 p-5 mx-auto">
        <div className="flex justify-center items-center space-x-2">
          <img
            src="images/logo.jpg"
            alt="logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-xl md:text-2xl font-bold font-mono">
            Percy Verence{" "}
          </h1>
        </div>
      {account ? (
        <button
          className="bg-[#202020] text-white px-4 py-2 rounded-md"
          onClick={() => setDropdown(!dropdown)}
        >
          {account.slice(0, 5)}...{account.slice(-4)}
        </button>
      ) : (
        <button
          className="bg-[#202020] text-white px-4 py-2 rounded-md"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}

      {/** Dropdown menu */}

      {dropdown && (
        <div className="absolute top-16 right-5 w-32 bg-[#202020] rounded-md p-1 hover:bg-[#443e3e]">
          <button
            className="flex items-center gap-2 text-white w-full py-1 px-2 rounded-md "
            onClick={() => {
              setDropdown(false);
              setAccount(null);
            }}
          >
            Disconnect <FiLogOut size={20}/>
          </button>
        </div>
      )}
      </header>

      <section className="flex flex-col items-center justify-center space-y-4 mt-8 pb-4">
        <div className="w-5/6 md:w-1/3">
          <img
            src="images/img.jpg"
            alt="image-of-percy-verence"
            className="h-60 w-full rounded-md"
          />
        </div>
        <h1 className="text-3xl font-bold font-mono">PERCY VERENCE</h1>

        <p className="w-5/6 md:w-2/3 text-center text-[#5F5F5F]">
          Elon's new character Percy Verence, the successor of fallen warrior
          Kiekus Maximus. This is the OG coin, we have insider info that's why
          it first minted onchain hours before the public knew. <br />
          <b>CTO claimed</b>
        </p>

        <div className="flex space-x-4">
          <a
            href="#"
            className="flex justify-between items-center space-x-4 rounded-md bg-[#202020]  hover:bg-[#443e3e] text-white px-8 py-3"
          >
            <span className="">
              <FaXTwitter className="mr-2" />
            </span>{" "}
            Twitter
          </a>
          <a
            href="#"
            className="flex justify-between items-center space-x-4 rounded-md bg-[#202020]  hover:bg-[#443e3e] text-white px-8 py-3"
          >
            <span className="">
              <PiTelegramLogoLight className="mr-2" />
            </span>
            Telegram
          </a>
        </div>

        <div className="flex flex-col space-y-4 w-5/6 md:w-2/3 border-2 border-[#E3E3E3] rounded-md px-5 py-3 ">
          <div className="flex items-center space-x-2 ">
            <img
              src="images/logo.jpg"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />{" "}
            <h3 className="text-xl font-bold font-mono tracking-wide">
              CONTRACT ADDRESS
            </h3>
          </div>

          <div className="flex w-full justify-between items-center p-2 border-2 border-[#E3E3E3] rounded-md">
            <p className="text-sm truncate md:text-clip font-bold text-[#5F5F5F] md:tracking-wide">
              {contractAddress}
            </p>
            <div className="flex justify-center items-center p-2 bg-[#CDCDCD] rounded-md">
              <button
                onClick={handleCopy}
                className="text-white hover:text-gray-400"
              >
                {copied ? (
                  <FaCheck className="w-4 h-4 text-green-400" /> // Check icon after copy
                ) : (
                  <IoCopyOutline className="w-4 h-4 text-black" /> // Clipboard icon before copy
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
