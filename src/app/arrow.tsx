export default function Arrow({
  diagonal = false,
  left = false,
}: {
  diagonal?: boolean;
  left?: boolean;
}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          diagonal
            ? "M6 18 18 6M6 6h12v12"
            : left
              ? "M20 12H4m6-6-6 6 6 6"
              : "M4 12h16m-6-6 6 6-6 6"
        }
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
