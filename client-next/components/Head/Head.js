import Head from 'next/head';

const HeadComponent = ({ pageTitle, pageDescription, pageKeywords }) => (
    <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {pageKeywords && <meta name="keywords" content={pageKeywords} />}
    </Head>
);

export default HeadComponent;