import logo from "@/public/TopCoorperative_logo.png";
import Image from "next/image";

/**
 * Renders the footer
 */
const Footer = () => {
  return (
    <footer className="border-t flex justify-center items-center">
      {/* <div className="t flex justify-center items-baseline"> */}
        <small>Copyright &copy;2024</small>
        <Image
          src={logo}
          alt="site logo"
          width={100}
        />
      {/* </div> */}
    </footer>
  );
};

export default Footer;
