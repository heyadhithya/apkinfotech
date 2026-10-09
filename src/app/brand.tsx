import Image from "next/image";
export default function Brand() {
  return (
    <a
      className="brand official-brand"
      href="#main"
      aria-label="APK Infotech home"
    >
      <Image
        src="/images/apk-official-logo.webp"
        alt=""
        width={75}
        height={60}
        className="official-logo"
      />
      <span className="official-wordmark">
        <strong>APK INFOTECH</strong>
        <span>IT SOLUTIONS PVT LTD</span>
      </span>
    </a>
  );
}
