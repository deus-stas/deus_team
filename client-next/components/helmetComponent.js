import React from 'react';
import { Helmet } from 'react-helmet-async';

function HelmetComponent({ pageTitle, pageDescription, pageKeywords }) {
    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content={pageKeywords} />
        </Helmet>
    );
}

export default HelmetComponent;