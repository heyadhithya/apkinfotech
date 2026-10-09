import Image from "next/image";
import Link from "next/link";
export default function Brand() {
  return (
    <Link className="brand official-brand" href="/#main">
      <Image
        src="/images/apk-official-logo.webp"
        alt=""
        width={75}
        height={60}
        className="official-logo"
      />
      <span className="official-wordmark">
        <strong>APK INFOTECH</strong> <span>IT SOLUTIONS PVT LTD</span>
      </span>
      <span className="sr-only"> home</span>
    </Link>
  );
}
