interface IProps {
  classname: string;
}

export default function Logo({ classname }: IProps) {
  return (
    <svg
      className={classname}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 11"
      fill="inherit"
    >
      <path
        d="M10.005 8.916L1.314.225a.77.77 0 0 0-1.088 0 .77.77 0 0 0 0 1.088l9.235 9.235a.77.77 0 0 0 1.088 0l9.235-9.235a.77.77 0 0 0-.019-1.088.77.77 0 0 0-1.069 0l-8.691 8.691z"
        fill="inherit"
      />
    </svg>
  );
}
