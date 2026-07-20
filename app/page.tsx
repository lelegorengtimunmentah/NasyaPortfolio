import { siteData } from '@/lib/data'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import BiodataSection from '@/components/BiodataSection'
import PrestasiSection from '@/components/PrestasiSection'
import GallerySection from '@/components/GallerySection'
import MotivasiSection from '@/components/MotivasiSection'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <section id="hero">
          <HeroSection hero={siteData.hero} />
        </section>
        <section id="tentang">
          <AboutSection about={siteData.about} />
        </section>
        <section id="biodata">
          <BiodataSection biodata={siteData.biodata} />
        </section>
        <section id="prestasi">
          <PrestasiSection achievements={siteData.achievements} />
        </section>
        <section id="galeri">
          <GallerySection gallery={siteData.gallery} />
        </section>
        <MotivasiSection quote={siteData.motivationalQuote} />
      </main>
      <Footer footer={siteData.footer} />
    </>
  )
}
