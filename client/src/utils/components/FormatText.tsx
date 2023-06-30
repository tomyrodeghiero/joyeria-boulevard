export const FormatText = ({ text, className }: any) => {
  return text.split("\r\n").map((line: any, i: number) => (
    <p key={i} className={className}>
      {line}
    </p>
  ));
};
