import '../styles/Header.css';

function Header({ title, children }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>{title}</h1>
        <nav className="header-nav">
          {children}
        </nav>
      </div>
    </header>
  );
}

export default Header; 