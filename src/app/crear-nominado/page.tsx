import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import CreateNominatedForm from '@/components/organisms/CreateNominatedForm';
// import { getImagesNominateds } from '@/services/firebaseService';


export default async function CreateNominatedPage() {
  // const nominatedsImage = await getImagesNominateds();
  const nominatedsImage = [
    '/images/no-image.webp',
    '/images/nominateds/2026/dionelvy.jpeg',
    '/images/nominateds/2026/aa.jpeg',
    '/images/nominateds/2026/aaron.webp',
    '/images/nominateds/2026/brignette.jpeg',
    '/images/nominateds/2026/chua.webp',
    '/images/nominateds/2026/gg.jpeg',
    '/images/nominateds/2026/jaasiel.jpeg',
    '/images/nominateds/2026/jesus.jpeg',
    '/images/nominateds/2026/lismar.webp',
    '/images/nominateds/2026/maikel.webp',
    '/images/nominateds/2026/sharom.webp',
    '/images/nominateds/2026/xiomara.webp',
    '/images/nominateds/2026/yasmely.webp',
    '/images/nominateds/2026/nelson.jpeg',
    '/images/nominateds/2026/melianny.jpeg',
    '/images/nominateds/2026/jesus-m.jpeg',
    '/images/nominateds/2026/josue-m.jpeg',
    '/images/nominateds/2026/muchi.jpeg',
    '/images/nominateds/2026/carlos.jpg',
    '/images/nominateds/2026/daniel.jpeg',
    '/images/nominateds/2026/ernesto.jpeg',
    '/images/nominateds/2026/isamar.jpeg',
    '/images/nominateds/2026/william.jpeg',
    '/images/nominateds/2026/alianny.jpeg',
    '/images/nominateds/2026/yorgelis.jpeg',
  ];

  return (
    <main>
      <Navbar />
      <CreateNominatedForm nominatedsImage={nominatedsImage} />
      <Footer />
    </main>
  );
}

