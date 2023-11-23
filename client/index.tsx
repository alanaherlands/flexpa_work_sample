import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.css'
import FlexpaLink from '@flexpa/link';
import EobComponent from '../components/eobDisplay';
import { useState, useEffect } from 'react';
import { getAccessToken, getPatientId, getExplanationOfBenefit } from '../services/apiRequests';

const Home = () => {
    // declare and initialize state variables
    const [accessToken, setAccessToken] = useState('');
    const [patientId, setPatientId] = useState('');
    const [patientData, setPatientData] = useState({});
    const [pageError, setPageError] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    // useEffect hook for component initialization
    useEffect(() => {
      const initFlexpaLink = async () => {
        try {
          // initialize FlexpaLink and obtain a public token
          const publicToken = await new Promise((resolve, reject) => {
            FlexpaLink.create({
              publishableKey: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY ?? '',
              onSuccess: resolve,
              onError: reject,
            });
        });
      
        setPageLoading(true);
        // obtain access token using public token
        const accessToken = await getAccessToken(publicToken);
          // if access token obtained, set state variables and handle patient ID
          if (accessToken) {
            setAccessToken(accessToken);

            const patientId = await getPatientId(accessToken);

            if (patientId) {
              setPatientId(patientId);
              setPageError(false);
            }
        }
      
        setPageLoading(false);
      } catch (error) {
        console.error(error);
        setPageError(true);
        setPageLoading(false);
      }
    };
    // call initiFlexpaLink function on component mount
    initFlexpaLink();
  }, []); // empty dependency array so effect runs only once on mount
  
  // event handler for linking payer
  const handleLinkPayer = () => {
    // set page loading state to true, reset error state, and open FlexpaLink
    setPageLoading(true);
    setPageError(false);
    FlexpaLink.open();
  };
  
  // event handler for getting data
  const handleGetData = async () => {
    // reset patient data, set loading state to true, reset error state
    setPatientData({});
    setPageLoading(true);
    setPageError(false);

  try {
    // retrieve EoB data using patient ID and access token
    const eobData = await getExplanationOfBenefit(patientId, accessToken);
    // if data is obtained, set patient data state
    if (eobData) {
        setPatientData(eobData);
    }
  } catch (error) {
    // handle errors during data retrieval
    console.log(error);
    setPageError(true);
  } finally {
    // regardless of success or failure, set page loading state to false
    setPageLoading(false);
  }
 };

 return (
  <div className={styles.container}>
    <Head>
      <title>Patient Health Data Downloader</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Patient{' '}
        Health{' '}
        <span className={styles.secondaryTheme}>Data</span>{' '}
        Downloader
      </h1>

      {pageLoading ? null : (
        <p className={styles.description}>
          To retrieve your health data:
        </p>
      )}

      <br />

      <div className={styles.column}>
        <button
           onClick={!patientId ? handleLinkPayer : handleGetData}
           disabled={pageLoading}
        >

          {!patientId ? 'Choose your health payer' : 'Download your health data'}
        </button>

          {pageError && <p>Something went wrong</p>}

          {patientId && accessToken && (<EobComponent data={patientData}/>)}
      
        </div>
      </main>

    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </div>
);
};


export default Home;