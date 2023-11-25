import Head from 'next/head'
import Image from 'next/image'
import styles from '../src/styles/Home.module.css'
import FlexpaLink from '../node_modules/@flexpa/link';
import EobComponent from '../src/app/client/components/eobDisplay.tsx';
import { useState, useEffect } from 'react';
import { getAccessToken, getPatientId, getExplanationOfBenefit } from './api/apiRequests.ts';

const Home = () => {
    // declare and initialize state variables
    const [accessToken, setAccessToken] = useState('');
    const [patientId, setPatientId] = useState('');
    const [patientData, setPatientData] = useState({});
    const [pageError, setPageError] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const initializeFlexpaLink = async (publicToken: string) => {
      try {
        
        const accessToken = await getAccessToken(publicToken);
        // if access token is obtained, set state variables and handle patient ID retrieval
        if (accessToken) {
          setAccessToken(accessToken);
          const patientId = await getPatientId(accessToken);
    
          if (patientId) {
            setPatientId(patientId);
            setPageLoading(false);
            setPageError(false);
          } else {
            setPageError(true);
          }
        } else {
          setPageError(true);
        }
      } catch (error) {
        console.error(error);
        setPageError(true);
      } finally {
        setPageLoading(false);
      }
    };
    
    // useEffect hook to run FlexpaLink initialization on component mount
    useEffect(() => {
      const runFlexpaLink = async () => {
        try {
          // run on client-side only
          await new Promise<void>((resolve, reject) => {
            // initialize FlexpaLink with publishable key and handle success callback
            FlexpaLink.create({
              publishableKey: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY ?? '',
              onSuccess: async (publicToken) => {
                // call the initializeFlexpaLink function passing in the public token
                await initializeFlexpaLink(publicToken);
                resolve();
              },
            });
          });
        } catch (error) {
          console.error(error);
          setPageError(true);
          setPageLoading(false);
        }
      };
    
      // run the initialization function on component mount
      runFlexpaLink();
    }, []);
  
  // event handler for linking payer
  const handleLinkPayer = () => {
    // set page loading state to true, reset error state, and open FlexpaLink
    setPageLoading(true);
    setPageError(false);
    // check if FlexpaLink is initialized before opening
    if (!pageLoading && !pageError) {
      FlexpaLink.open();
    }
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
      <title>Your Health, Your Data</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
    <h1 className={styles.title}>
      <div>
        <span className={styles.title}>Your</span>{' '}
        <span className={styles.secondaryTheme}>Health,</span>{' '}
      </div>
      <div>
        <span className={styles.title}>Your</span>{' '}
        <span className={styles.secondaryTheme}>Data</span>{' '}
      </div>
    </h1>

        <p className={styles.description}>
          Let's get started
        </p>

      <br />

      <div className={styles.column}>
        <button
          className={`${styles.button} ${!patientId ? styles.choosePayer : styles.downloadData}`}
          onClick={!patientId ? handleLinkPayer : handleGetData}
          disabled={pageLoading}
        >

          {!patientId ? 'Choose your health payer' : 'Download your health data'}
        </button>

          {pageError && <p>Oops, something went wrong</p>}

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