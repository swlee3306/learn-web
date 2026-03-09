export default function GuideBox({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="smallCard" style={{background: 'rgba(255,255,255,0.06)'}}>
      <div className="smallTitle">{title}</div>
      <div className="smallText" style={{whiteSpace: 'pre-wrap'}}>{children}</div>
    </div>
  );
}
