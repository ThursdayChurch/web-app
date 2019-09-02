import React from 'react'
import Router from './components/Router/index'
import { NavbarWithOpacity } from './components/Navbar'
import Footer from './components/Footer'
import SEO from './seo'

const App = () => {
  window.scrollTo(0, 0)

  return (
    <div className="App bg-light">
      <SEO />

      <div className="App-body mt-0">
        <Router />
      </div>

      <Footer />
    </div>
  )
}

export default App
