import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import logo from '../assets/imagenes/logotipo.jpg';
import basicos from '../assets/imagenes/basicos.jpg';
import diversificados from '../assets/imagenes/diversificados.jpg';
import maestros from '../assets/imagenes/maestros.jpg';
import laboratorios from '../assets/imagenes/laboratorios.jpg';
import comunidadEstudiantil from '../assets/imagenes/comunidad_estudiantil.jpg';
import cienciaEstudiantil from '../assets/imagenes/ciencia_estudiantil.jpg';
import centro from '../assets/imagenes/centro.jpg';
import campeonato from '../assets/imagenes/campeonato.jpg';

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
              <div className="brand-logo" aria-hidden>  <img src={logo}  height={60}  className="h-8 w-auto" /></div>
              <div>
                <div className="brand-name">Future Academy</div>
                <div className="brand-sub">Formando líderes con valores</div>
              </div>
            </div>
            <nav className="nav">
              <button className="btn btn-sm" onClick={() => document.getElementById('programas')?.scrollIntoView({ behavior: 'smooth' })}>Programas</button>
              <button className="btn btn-sm" onClick={() => document.getElementById('mision-vision')?.scrollIntoView({ behavior: 'smooth' })}>Misión & Visión</button>
              <button className="btn btn-sm" onClick={() => document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' })}>Noticias</button>
              <Link to="/login" className="btn btn-sm">Portal Estudiantil</Link>
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
            </div>
          </div>
        </section>

        {/* PROGRAMAS */}
        <section id="programas" className="section">
          <div className="container">
            <h2 className="section-title">Programas Académicos</h2>
            <div className="grid cards">
              <article className="card">
                <div className="program-image">
                  <img src={basicos} alt="Estudiantes de básicos en clase"
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                </div>
                <div className="card-content">
                  <h3>Básicos</h3>
                  <p>Pensamiento crítico, laboratorios y proyectos interdisciplinarios para formar bases sólidas.</p>
                </div>
              </article>
              <article className="card">
                <div className="program-image">
                  <img src={diversificados} alt="Estudiantes de diversificado"
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                </div>
                <div className="card-content">
                  <h3>Diversificado</h3>
                  <p>Orientaciones técnicas y preparación universitaria con enfoque en competencias del siglo XXI.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* MISIÓN Y VISIÓN */}
        <section id="mision-vision" className="section alt">
          <div className="container">
            <h2 className="section-title">Nuestra Filosofía</h2>
            <div className="grid mission-vision">
              <div className="mission-card">
                <h3>Misión</h3>
                <p>
                  Formar estudiantes integrales con excelencia académica, valores sólidos y competencias
                  del siglo XXI, preparándolos para ser líderes transformadores en una sociedad global
                  y tecnológicamente avanzada.
                </p>
              </div>
              <div className="vision-card">
                <h3>Visión</h3>
                <p>
                  Ser reconocidos como la institución educativa líder en Guatemala, destacando por
                  nuestra innovación pedagógica, formación en valores y el éxito de nuestros graduados
                  en universidades y en la vida profesional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section id="valores" className="section">
          <div className="container">
            <h2 className="section-title">¿Por qué elegirnos?</h2>
            <div className="grid features">
              <div className="feature">
                <img src={maestros}/>
                <h4>Docentes comprometidos</h4>
                <p>Acompañamiento cercano y actualización pedagógica constante.</p>
              </div>
              <div className="feature">
                <img src={laboratorios}/>
                <h4>Laboratorios y tecnología</h4>
                <p>Espacios de ciencias, robótica y aulas digitales.</p>
              </div>
              <div className="feature">
                <img src={comunidadEstudiantil}/>
                <h4>Comunidad y valores</h4>
                <p>Proyectos solidarios, deportes y artes para crecer en equipo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NOTICIAS CON IMÁGENES */}
        <section id="noticias" className="section alt">
          <div className="container">
            <h2 className="section-title">Noticias y Eventos</h2>
            <div className="grid news">
              <article className="news-item">
                <div className="news-image">
                  <img src={cienciaEstudiantil} alt="Feria de ciencias"
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }} />
                </div>
                <div className="news-content">
                  <h4>Semana de Ciencia</h4>
                  <p>Exposición de proyectos elborados por los estudiantes del nievel diversificado,
                    del 14 al 18 de octubre.</p>
                </div>
              </article>
              <article className="news-item">
                <div className="news-image">
                  <img src={centro} alt="Instalaciones del colegio"
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }} />
                </div>
                <div className="news-content">
                  <h4>presentación</h4>
                  <p>Conoce nuestras instalaciones y equipo docente - 26 de octubre.</p>
                </div>
              </article>
              <article className="news-item">
                <div className="news-image">
                  <img src={campeonato} alt="Campeonato deportivo"
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }} />
                </div>
                <div className="news-content">
                  <h4>Campeonato Intercolegial</h4>
                  <p>Felicitaciones al equipo por su destacada participación en los juegos inter-colegiales.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="section">
          <div className="container contact">
            <div>
              <h2 className="section-title">Contacto</h2>
              <ul className="contact-list">
                <li>📍 San Pedro Sacatepequez, Guatemala</li>
                <li>☎️ (502) 1234 5678</li>
                <li>✉️ admisiones@futureacademy.edu</li>
                <li>🕘 Lun-Vie: 7:00-15:00</li>
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
            <span>© {new Date().getFullYear()} Future Academy</span>
            <nav className="footer-nav">
              <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
            </nav>
          </div>
        </footer>
      </>
  );
}