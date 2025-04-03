
import Link from "next/link";
import AppHeader from "../appHeader/AppHeader";

const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}`;

// async function getHeaderData() {
//     const response = await fetch(`${apiUrl}/api/headerData/`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   }

// async function getServices() {
//     const response = await fetch(`${apiUrl}/api/services/`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   }




const AppHeaderNext = () => {
    
    // const headerData = getHeaderData();
    // const services = getServices();

    // const [headerData, services, contacts] = await Promise.all([
    //     getHeaderData(),
    //     getServices(),
    //     getContacts(),
    // ]);



  const navLink = (
    <nav className={`header__nav m-text`}>
        <ul className={`header__nav-list `}>
            <li className={`header__nav-item hover-flip `}>
                <Link href="/agency">
                    <span data-hover="Агентство">Агентство</span>
                </Link>
            </li>
            <div style={{position: "relative"}}>
                <li className={`header__nav-item `}>
                    <Link href="/services">
                        <span data-hover="Услуги">Услуги</span>
                    </Link>
                </li>
            </div>

            <li className={`header__nav-item `}>
                <Link  href="/projects">
                    <span data-hover="Проекты">Проекты</span>
                </Link>
            </li>
            <li className={`header__nav-item`}>
                <Link  href="/blog">
                    <span data-hover="Блог">Блог</span>
                </Link>
            </li>
            <li className={`header__nav-item`}>
                <Link href="/contacts">
                    <span data-hover="Контакты">Контакты</span>
                </Link>
            </li>
        </ul>
    </nav>
)
  


  
  return (
    <> 
        <AppHeader />
        <header style={{display:'none'}} className={`header`}>
            <div className="container">
                <div className="header__wrap">
                    <Link href="/" className='header__logo'>
                        Главная
                    </Link>
                    {(<>{navLink}</>)}
                    <span className="header-nav"
                            style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "flex-end",
                                alignItems: 'center'
                            }}>
                        <a className={`menu-contacts `} href={`tel:+74951034351`}>
                            <div >
                                +74951034351
                            </div>
                        </a>
                        <Link 
                            href="/contacts"
                            className={`header__discuss `}
                            datahash="contactUs"
                        >
                            <span className="header__discuss-flex">
                                <div 
                                    datahash="contactUs"
                                    className="m-text text">
                                        Обсудить проект
                                </div>
                            </span>

                        </Link>
                        <div className={`header__burger hidden-desktop`}>
                            меню
                        </div>
                    </span>

                </div>
            </div>
        </header>
    </>
  );
};

export default AppHeaderNext