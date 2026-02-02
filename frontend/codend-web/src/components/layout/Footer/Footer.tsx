export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-center text-muted-foreground">
        © {new Date().getFullYear()} Code & Design — All rights reserved
      </div>
    </footer>
  );
}
