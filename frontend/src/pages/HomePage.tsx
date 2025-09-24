import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function HomePage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Gracias, ${form.nombre}! Pronto te contactaremos a ${form.email}.`);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
      <>
        {/* HEADER / NAV */}
        <header className="site-header">
          <div className="container header-inner">
            <div className="brand">
              <div className="brand-logo" aria-hidden>🎓</div>
              <div>
                <div className="brand-name">Institución Future Academy</div>
                <div className="brand-sub">Formando líderes con valores</div>
              </div>
            </div>

            <nav className="nav">
              <a href="#programas">Programas</a>
              <a href="#valores">Valores</a>
              <a href="#noticias">Noticias</a>
              <a href="#contacto" className="btn btn-sm btn-ghost">Contacto</a>
              <Link to="/login" className="btn btn-sm">Login</Link>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1>Educación integral para un futuro brillante</h1>
              <p>
                Acompañamos a cada estudiante en su camino académico y humano,
                con metodologías activas, tecnología y comunidad.
              </p>
              <div className="hero-cta">
                <a href="#programas" className="btn">Conoce nuestros programas</a>
                <Link to="/login" className="btn btn-outline">Portal Estudiantil</Link>
              </div>
            </div>
            <div className="hero-illus" aria-hidden>
              📚 🧪 💻 ⚽
            </div>
          </div>
        </section>

        {/* PROGRAMAS */}
        <section id="programas" className="section">
          <div className="container">
            <h2 className="section-title">Programas Académicos</h2>
            <div className="grid cards">
              <article className="card">
                <h3>Preprimaria</h3>
                <p>Aprendizaje lúdico, desarrollo socioemocional y psicomotricidad.</p>
              </article>
              <article className="card">
                <h3>Primaria</h3>
                <p>Fundamentos sólidos en lectoescritura, matemática y ciencias.</p>
              </article>
              <article className="card">
                <h3>Básicos</h3>
                <p>Pensamiento crítico, laboratorios y proyectos interdisciplinarios.</p>
              </article>
              <article className="card">
                <h3>Diversificado</h3>
                <p>Orientaciones técnicas y preparación para la universidad.</p>
              </article>
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section id="valores" className="section alt">
          <div className="container">
            <h2 className="section-title">¿Por qué elegirnos?</h2>
            <div className="grid features">
              <div className="feature">
                <div className="feature-ico">👩‍🏫</div>
                <h4>Docentes comprometidos</h4>
                <p>Acompañamiento cercano y actualización pedagógica constante.</p>
              </div>
              <div className="feature">
                <div className="feature-ico">🧬</div>
                <h4>Laboratorios y tecnología</h4>
                <p>Espacios de ciencias, robótica y aulas digitales.</p>
              </div>
              <div className="feature">
                <div className="feature-ico">🤝</div>
                <h4>Comunidad y valores</h4>
                <p>Proyectos solidarios, deportes y artes para crecer en equipo.</p>
              </div>
              <div className="feature">
                <div className="feature-ico">🛡️</div>
                <h4>Ambiente seguro</h4>
                <p>Protocolos de seguridad, orientación y bienestar estudiantil.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NOTICIAS */}
        <section id="noticias" className="section">
          <div className="container">
            <h2 className="section-title">Noticias y Eventos</h2>
            <div className="grid news">
              <article className="news-item">
                <h4>Semana de Ciencia</h4>
                <p>Exposición de proyectos STEAM del 14 al 18 de octubre.</p>
              </article>
              <article className="news-item">
                <h4>Open House</h4>
                <p>Conoce nuestras instalaciones y equipo docente — 26 de octubre.</p>
              </article>
              <article className="news-item">
                <h4>Campeonato Intercolegial</h4>
                <p>Felicitaciones al equipo por su destacada participación.</p>
              </article>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="section alt">
          <div className="container contact">
            <div>
              <h2 className="section-title">Contacto</h2>
              <ul className="contact-list">
                <li>📍 5a. Avenida 10-25, Zona 1, Ciudad</li>
                <li>☎️ (502) 5555-5555</li>
                <li>✉️ admisiones@institucion.edu</li>
                <li>🕘 Lun–Vie: 7:00–15:00</li>
              </ul>
            </div>

            <form onSubmit={onSubmit} className="contact-form">
              <label>
                Nombre
                <input
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Tu nombre"
                />
              </label>
              <label>
                Email
                <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tucorreo@ejemplo.com"
                />
              </label>
              <label>
                Mensaje
                <textarea
                    rows={4}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                />
              </label>
              <button className="btn" type="submit">Enviar</button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="container footer-inner">
            <span>© {new Date().getFullYear()} Institución Educativa</span>
            <nav className="footer-nav">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
            </nav>
          </div>
        </footer>
      </>
  );
}