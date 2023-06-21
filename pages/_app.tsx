import Layout from '@/components/Layout'

// Login and Register
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import EditModal from '@/components/modals/EditModal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* React Toaster */}
      <Toaster />

      {/* Authentication Modals */}
      <LoginModal />
      <RegisterModal />
      <EditModal />

      <Layout>
        <Component {...pageProps} />
      </Layout>


    </SessionProvider>
    
    
  )
}
