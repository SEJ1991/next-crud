interface Props {
  children: React.ReactNode;
}
export default function MovieLayout({ children }: Props) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
