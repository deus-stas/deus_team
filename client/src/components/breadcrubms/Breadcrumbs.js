import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import './breadcrumbs.scss'

const routes = [
    { path: '/', breadcrumb: 'Главная' },
    { path: '/projects', breadcrumb: 'Проекты' },
    { path: '/projects/detail', breadcrumb: 'Проекты' },
    { path: '/services', breadcrumb: 'Услуги' },
    { path: '/services/detail', breadcrumb: 'Услуги' },
    { path: '/news', breadcrumb: 'Блог' },
    { path: '/news/detail', breadcrumb: 'Блог' },
];

function Breadcrumbs() {
    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <nav className='breadcrumbs'>
            <div className="container">
                <div className="breadcrumbs__wrap">
                    {breadcrumbs.map(({ match, breadcrumb }, i) => (
                        i !== breadcrumbs.length - 1 ? <Link className='breadcrumbs__item' key={breadcrumb.key} to={match.pathname}>{breadcrumb}</Link> : null
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Breadcrumbs;